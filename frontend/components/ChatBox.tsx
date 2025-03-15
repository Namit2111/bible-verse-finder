"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


type ChatMessage = {
    role: 'user' | 'assistant';
    text: string;
};


type CodeProps = {
    inline?: boolean;
    className?: string;
      children?: React.ReactNode;
  };


const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input }),
            });
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
             if (data && data.text) {
              const assistantMessage: ChatMessage = { role: 'assistant', text: data.text };
                  setMessages(prevMessages => [...prevMessages, assistantMessage]);
            } else {
              console.error("Invalid response from /api/chat", data)
                 const errorMessage: ChatMessage = {
                  role: 'assistant',
                  text: 'There was an issue communicating with Gemini. Please try again later.',
                  }
                    setMessages(prevMessages => [...prevMessages, errorMessage]);
            }

        } catch (error) {
           console.error("failed to send text", error)
          const errorMessage: ChatMessage = {
              role: 'assistant',
              text: 'There was an issue communicating with Gemini. Please try again later.',
          }
        setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <div className="flex flex-col h-3/6">
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                        {message.role === 'user' ? (
                            <p>{message.text}</p>
                                ) : (
                                    <ReactMarkdown
                                    components={{
                                        code: ({  inline, className, children, ...props }: CodeProps) => {
                                            const match = (className || '').match(/language-(?<lang>[\w-]+)/);
                                              return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={oneDark}
                                                        language={match.groups?.lang}
                                                        PreTag="div"
                                                          {...props}
                                                      >
                                                          {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                      }}
                                    >
                                {message.text}
                            </ReactMarkdown>
                        )}
                    </div>
                    </div>
                ))}
                 {isTyping && (
                    <div className="mb-4 text-left">
                        <div className="inline-block p-2 rounded-lg bg-gray-200">
                            Typing...
                        </div>
                    </div>
                 )}
            </div>

            <div className="p-4">
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about the Bible..."
                        className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none"
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600 ">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;