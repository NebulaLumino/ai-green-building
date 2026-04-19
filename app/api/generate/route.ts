import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { buildingType, size, age, location, energyBill, renewablePercentage, description } = await req.json();

    const prompt = `You are an AI green building energy efficiency expert. Analyze the following building parameters and provide a comprehensive energy efficiency report.

Building Details:
- Type: ${buildingType}
- Size: ${size} sq ft
- Age: ${age} years
- Location: ${location}
- Monthly Energy Bill: $${energyBill}
- Renewable Energy: ${renewablePercentage}%
- Additional Notes: ${description}

Please provide a detailed analysis including:
1. **Current Energy Performance Score** (A-F rating scale)
2. **Key Inefficiencies Identified** (top 3-5 issues)
3. **Recommended Energy Conservation Measures** (with estimated savings)
4. **Renewable Energy Integration Plan** (solar, wind, geothermal options)
5. **ROI Timeline** for proposed improvements
6. **Green Building Certification Recommendations** (LEED, ENERGY STAR, etc.)
7. **Estimated Annual Energy Cost Savings** after improvements
8. **Carbon Emission Reduction** (tons CO2/year)

Format the response with clear markdown headings and bullet points. Be specific with numbers and percentages.`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: 'DeepSeek API error', details: error }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ result: content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Server error', details: message }, { status: 500 });
  }
}
