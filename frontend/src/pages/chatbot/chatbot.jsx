import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaComment, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'incoming', content: 'Bonjour ! Je suis votre assistant beauté.\nComment puis-je vous aider avec votre routine skincare, vos soins capillaires ou vos produits de beauté aujourd\'hui ?' }
  ]);
  const chatboxRef = useRef(null);
  const textareaRef = useRef(null);

  const API_KEY = "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";

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const isBeautyRelated = (message) => {
    const beautyKeywords = [
      'beauté', 'skincare', 'soin', 'peau', 'visage', 'nettoyant', 
      'hydratant', 'crème', 'sérum', 'masque', 'exfoliant', 'tonique',
      'cheveux', 'shampoing', 'après-shampoing', 'masque capillaire', 
      'soin cheveux', 'routine', 'matin', 'soir', 'produit', 'cosmétique',
      'maquillage', 'anti-âge', 'acné', 'points noirs', 'rides', 
      'peau sèche', 'peau grasse', 'peau mixte', 'routine capillaire',
      'huile', 'solaires', 'protection solaire', 'SPF', 'beauty'
    ];
    
    return beautyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateResponse = async () => {
    const incomingMessage = { role: 'incoming', content: 'Je réfléchis...' };
    setMessages(prev => [...prev, incomingMessage]);

    try {
      // Vérifier si la question concerne la beauté
      if (!isBeautyRelated(userMessage)) {
        setMessages(prev => [...prev.slice(0, -1), { 
          role: 'incoming', 
          content: "Désolé, je ne peux répondre qu'aux questions concernant la beauté, le skincare, les soins capillaires et les routines de soin. Pouvez-vous me poser une question sur ces sujets ?",
          error: true 
        }]);
        return;
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: "Tu es un expert en beauté, skincare et soins capillaires. Réponds uniquement aux questions sur ces sujets. Si la question n'est pas liée, explique poliment que tu ne peux répondre qu'aux questions sur la beauté, le skincare, les produits cosmétiques et les routines de soin."
          }, { 
            role: "user", 
            content: userMessage 
          }]
        })
      });

      const data = await response.json();
      const botMessage = data.choices && data.choices.length > 0 
        ? data.choices[0].message.content 
        : "Je n'ai pas pu générer de réponse. Pouvez-vous reformuler votre question ?";

      setMessages(prev => [...prev.slice(0, -1), { role: 'incoming', content: botMessage }]);
    } catch (error) {
      setMessages(prev => [...prev.slice(0, -1), { 
        role: 'incoming', 
        content: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer.",
        error: true 
      }]);
    }
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'outgoing', content: userMessage }]);
    setUserMessage('');

    // Generate response after a short delay
    setTimeout(generateResponse, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chatbot Toggler Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-[#B17973] text-[#F5F0E6] transition-all duration-200 ${
          showChatbot ? 'rotate-90' : ''
        } hover:bg-[#D7A8A2]`}
      >
        {showChatbot ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaComment className="text-xl" />
        )}
      </button>

      {/* Chatbot Container */}
      <div
        className={`absolute right-0 bottom-16 w-96 bg-[#F5F0E6] rounded-lg shadow-xl transition-all duration-200 origin-bottom-right ${
          showChatbot
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-50 opacity-0 pointer-events-none'
        }`}
        style={{ boxShadow: '0 0 128px 0 rgba(0,0,0,0.1), 0 32px 64px 48px rgba(0,0,0,0.05)', border: '1px solid #E8D5C9' }}
      >
        {/* Chatbot Header */}
        <header className="bg-[#B17973] py-4 text-center relative rounded-t-lg">
          <h2 className="text-[#F5F0E6] text-xl font-medium">Assistant Beauté</h2>
          <button
            onClick={() => setShowChatbot(false)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#F5F0E6] md:hidden"
          >
            <FaTimes />
          </button>
        </header>

        {/* Chatbox */}
        <div
          ref={chatboxRef}
          className="h-96 overflow-y-auto p-6 pb-24"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-5 ${
                message.role === 'outgoing' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'incoming' && (
                <div className="flex items-end mr-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#B17973] text-[#F5F0E6] rounded">
                    <FaRobot />
                  </div>
                </div>
              )}
              <p
                className={`max-w-[75%] whitespace-pre-wrap text-sm p-3 rounded-lg ${
                  message.role === 'outgoing'
                    ? 'bg-[#B17973] text-[#F5F0E6] rounded-tr-none'
                    : message.error
                    ? 'bg-[#E8D5C9] text-[#5A4A42] rounded-tl-none'
                    : 'bg-[#E8D5C9] text-[#5A4A42] rounded-tl-none'
                }`}
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="absolute bottom-0 w-full flex gap-2 bg-[#F5F0E6] p-2 border-t border-[#E8D5C9]">
          <textarea
            ref={textareaRef}
            value={userMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question sur la beauté..."
            className="flex-grow h-14 max-h-36 border-none outline-none resize-none text-sm p-3 bg-[#F5F0E6] text-[#5A4A42] placeholder-[#8C6A5D]"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!userMessage.trim()}
            className={`self-end h-14 w-12 flex items-center justify-center ${
              userMessage.trim()
                ? 'text-[#B17973] cursor-pointer hover:text-[#D7A8A2]'
                : 'text-[#8C6A5D] cursor-not-allowed'
            }`}
          >
            <FaPaperPlane className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;