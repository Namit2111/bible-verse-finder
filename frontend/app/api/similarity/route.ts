import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  const { userInput } = await request.json();
  console.log("From similarity", userInput);
  try {
    // Make a request to the Flask app
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/api/similarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: userInput }), //changed to userInput instead of user_input
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ 
        error: 'An error occurred while fetching data', 
        details: error.message 
    }, { status: 500 });
  }
}