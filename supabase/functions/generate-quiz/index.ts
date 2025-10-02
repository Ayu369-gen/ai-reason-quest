import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating quiz questions using Gemini...');

    const systemPrompt = `You are an AI quiz generator. Generate 5 AI-related questions with 4 multiple choice options each. 
For each option, create a reasoning-based yes/no question that tests understanding.

Format your response as a JSON array with this structure:
[
  {
    "question": "Main question text",
    "options": [
      {
        "text": "Option A text",
        "reasoningQuestion": "A yes/no reasoning question about this option",
        "correctAnswer": true or false
      },
      ... (4 options total)
    ]
  },
  ... (5 questions total)
]

Make the reasoning questions thought-provoking and educational. Each reasoning question should help students understand the concept better.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Generate 5 AI quiz questions with reasoning-based yes/no questions for each option.' }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('Raw AI response:', content);

    // Parse JSON from response
    let questions;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      questions = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Invalid JSON in AI response');
    }

    // Validate structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid questions format');
    }

    // Flatten to 20 reasoning questions
    const reasoningQuestions = questions.flatMap((q: any, qIndex: number) => 
      q.options.map((opt: any, optIndex: number) => ({
        id: `q${qIndex}_o${optIndex}`,
        text: opt.reasoningQuestion,
        correctAnswer: opt.correctAnswer,
        originalQuestion: q.question,
        originalOption: opt.text,
      }))
    );

    // Shuffle questions
    const shuffled = reasoningQuestions.sort(() => Math.random() - 0.5);

    console.log(`Generated ${shuffled.length} reasoning questions`);

    return new Response(
      JSON.stringify({ questions: shuffled }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-quiz function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});