
import { type Message } from '@/components/AiChat';
import { toast } from 'sonner';

// Constante pour stocker la clé API
const GEMINI_API_KEY = "VOTRE_CLE_API_ICI"; // Remplacez cette valeur par votre clé API

// Option 1: Utiliser directement la clé API définie ci-dessus
export const sendMessage = async (message: string, conversation: Message[]): Promise<string> => {
  try {
    // Récupérer la clé API depuis localStorage s'il y en a une, sinon utiliser la constante
    const apiKey = getApiKey() || GEMINI_API_KEY;
    
    // Si aucune clé API valide n'est disponible, utilisez la version simulée
    if (!apiKey || apiKey === "VOTRE_CLE_API_ICI") {
      console.log("Aucune clé API valide trouvée, utilisation du mode simulation");
      return simulateAIResponse(message, conversation);
    }
    
    console.log("Préparation de l'appel à l'API Gemini avec une clé valide");
    
    // Configuration de la requête API
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    const queryParams = `?key=${apiKey}`;
    
    // Formater l'historique de conversation
    const formattedConversation = conversation.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Ajouter le message actuel
    formattedConversation.push({
      role: 'user',
      parts: [{ text: message }]
    });
    
    // Corps de la requête
    const requestBody = {
      contents: formattedConversation,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };
    
    console.log("Envoi de la requête à l'API Gemini...");
    console.log("URL:", `${url}${queryParams}`);
    console.log("Contenu de la requête:", JSON.stringify(requestBody, null, 2));
    
    // Envoi de la requête
    const response = await fetch(`${url}${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log("Statut de la réponse:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Détails de l'erreur API:", errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log("Structure de la réponse:", JSON.stringify(data, null, 2));
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
      console.error("Format de réponse inattendu:", JSON.stringify(data));
      throw new Error("Format de réponse inattendu de l'API Gemini");
    }
    
    console.log("Réponse reçue avec succès de l'API Gemini");
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Erreur détaillée lors de l'appel à l'API Gemini:", error);
    
    // Message d'erreur plus spécifique selon le type d'erreur
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("Problème de connexion réseau. Vérifiez votre connexion internet.");
    } else if (error instanceof Error && error.message.includes('429')) {
      toast.error("Limite de l'API atteinte. Veuillez réessayer plus tard.");
    } else if (error instanceof Error && error.message.includes('403')) {
      toast.error("Clé API invalide ou problème d'autorisation. Vérifiez votre clé API.");
    } else {
      toast.error("Échec de la réponse de l'IA. Veuillez réessayer.");
    }
    
    return "Je suis désolé, mais j'ai rencontré une erreur lors du traitement de votre demande. Veuillez vérifier votre clé API et réessayer.";
  }
};

// Option 2: Utiliser une clé stockée dans localStorage (plus sécurisé pour frontend uniquement)
export const setApiKey = (key: string) => {
  localStorage.setItem('gemini_api_key', key);
  console.log("Clé API enregistrée dans localStorage");
  return true;
};

export const getApiKey = () => {
  const key = localStorage.getItem('gemini_api_key');
  console.log("Récupération de la clé API depuis localStorage:", key ? "Clé trouvée" : "Aucune clé trouvée");
  return key;
};

// Cette fonction simule les réponses de l'IA pour la démonstration
const simulateAIResponse = (message: string, conversation: Message[]): string => {
  const lowercaseMsg = message.toLowerCase();
  
  // Very basic simulation of AI responses
  if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
    return "Hello! How can I assist you today?";
  } else if (lowercaseMsg.includes('generate a short story')) {
    return "Once upon a time, in a world where AI and humans worked together in harmony, there was a special program named Gemini. Gemini was designed to help people solve problems and create beautiful things.\n\nOne day, a young developer asked Gemini to write a story. The AI thought for a moment, its neural networks lighting up with possibilities. It crafted a tale not about machines or technology, but about connection and understanding.\n\nThe developer was moved by the story and shared it with others. Soon, people around the world were asking Gemini to help them express ideas they couldn't quite put into words themselves.\n\nThe partnership between human creativity and artificial intelligence created something neither could have made alone—a bridge of understanding between different ways of thinking.";
  } else if (lowercaseMsg.includes('explain quantum computing')) {
    return "Quantum computing is a type of computation that harnesses the unique properties of quantum mechanics to process information in ways that classical computers cannot.\n\nUnlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or 'qubits.' These qubits can exist in multiple states simultaneously due to a property called superposition. Additionally, qubits can be 'entangled,' meaning the state of one qubit can depend on the state of another, no matter the distance between them.\n\nThese properties allow quantum computers to perform certain calculations exponentially faster than classical computers. They're particularly promising for problems like factoring large numbers, simulating quantum systems, and optimizing complex systems.\n\nHowever, quantum computers are still in their early stages of development, facing challenges like maintaining qubit coherence (keeping them in their quantum state long enough to perform calculations) and error correction.";
  } else if (lowercaseMsg.includes('recipe')) {
    return "# Creative Quinoa Bowl with Citrus Dressing\n\n## Ingredients:\n- 1 cup quinoa, rinsed\n- 2 cups vegetable broth\n- 1 avocado, sliced\n- 1 cup cherry tomatoes, halved\n- 1 cucumber, diced\n- 1/4 cup red onion, finely diced\n- 1/4 cup fresh herbs (mint, cilantro, or parsley), chopped\n- 1/4 cup toasted nuts (pine nuts, almonds, or walnuts)\n- 1/4 cup dried cranberries or pomegranate seeds\n\n## For the Citrus Dressing:\n- Juice of 1 orange\n- Juice of 1 lemon\n- 2 tablespoons olive oil\n- 1 teaspoon honey or maple syrup\n- Salt and pepper to taste\n\n## Instructions:\n1. Cook quinoa in vegetable broth according to package instructions, then allow to cool.\n2. Whisk together all dressing ingredients in a small bowl.\n3. In a large bowl, combine the cooled quinoa with all other ingredients.\n4. Drizzle with the citrus dressing and gently toss to combine.\n5. Serve immediately or refrigerate for up to 2 days.";
  } else if (lowercaseMsg.includes('weather')) {
    return "I don't have access to real-time weather data. To get current weather information, you might want to check a weather app or website that can provide you with up-to-date forecasts for your location.";
  } else if (lowercaseMsg.includes('help') || lowercaseMsg.includes('what can you do')) {
    return "I'm a simulated version of Gemini AI, and I can help with various tasks such as:\n\n- Answering questions on a wide range of topics\n- Generating creative content like stories, poems, or ideas\n- Explaining complex concepts in simple terms\n- Helping with problem-solving\n- Providing information on various subjects\n\nFeel free to ask me anything, and I'll do my best to assist you!";
  } else {
    // Generic response for other inputs
    return "That's an interesting question. In a fully implemented version, I would connect to Google's Gemini API to provide you with a thorough and helpful response. For now, this is a demonstration of the user interface and interaction design. Feel free to try some of the example prompts!";
  }
};
