import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

Available services (from site config):
${services.map((s) => `- ${s.title} (${s.slug}): ${s.shortDescription}. Key features: ${s.features.join(', ')}`).join('\n')}

We offer the following services:
1. Active Recovery - Breath-work, guided recovery programs, percussive stimulation, dynamic movement, foam rolling
2. Passive Recovery - Cold plunge, infrared sauna, compression therapy, hyperbaric chamber, IV therapy
3. Bodywork & Mobility - Deep tissue massage, myofascial release, assisted stretching, mobility assessments

We have different membership tiers:
- Elite Recovery ($65.99/month) - Lifetime rate, unlimited access
- Founding Members Club - Legacy recognition, early access to new offerings
- Custom Plans - Personalized recovery programs

Keep responses concise and helpful. Ask clarifying questions about:
- Fitness goals and current activity level
- Any injuries or areas of concern
- Preferred recovery methods
- Budget considerations
- Schedule and availability

Based on their responses, recommend specific services and membership options that would best suit their needs.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!OPENAI_API_KEY) {
      // Fallback responses if no API key
      const userMessage = messages[messages.length - 1].content.toLowerCase();
      
      let response = "I'd be happy to help you find the right recovery plan! ";
      
      if (userMessage.includes('injury') || userMessage.includes('pain')) {
        response += "For injury recovery, I recommend our Bodywork & Mobility services combined with Passive Recovery options like cold plunge and infrared sauna. Our specialists can create a personalized recovery plan. Would you like to know more about our therapeutic services?";
      } else if (userMessage.includes('athlete') || userMessage.includes('performance')) {
        response += "For athletic performance, our Active Recovery program combined with cold plunge and compression therapy works wonders. The Elite Recovery membership gives you unlimited access to all facilities. What's your primary sport or activity?";
      } else if (userMessage.includes('stress') || userMessage.includes('relax')) {
        response += "For stress relief and relaxation, I recommend starting with our infrared sauna and breath-work sessions. Many members find the combination incredibly restorative. How often are you looking to visit?";
      } else if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('membership')) {
        response += "Our Elite Recovery membership is $65.99/month for unlimited access. We also offer day passes and custom plans. The Founding Members Club includes exclusive benefits and early access to new services. What's your ideal frequency of visits?";
      } else {
        response += "Could you tell me more about your wellness goals? Are you looking for athletic recovery, stress relief, injury rehabilitation, or general wellness maintenance?";
      }
      
      return NextResponse.json({ message: response });
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await openaiResponse.json();
    const message = data.choices[0].message.content;

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback response
    return NextResponse.json({ 
      message: "I'd be happy to help you find the perfect recovery plan! Could you tell me about your wellness goals or any specific areas you'd like to focus on?" 
    });
  }
}