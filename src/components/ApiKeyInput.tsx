
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setApiKey, getApiKey } from '@/services/gemini';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ApiKeyInput = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    // Vérifier si une clé existe déjà
    const savedKey = getApiKey();
    if (savedKey) {
      // Masquer la clé par sécurité (afficher uniquement les 4 derniers caractères)
      const maskedKey = savedKey.length > 4 
        ? '••••••••' + savedKey.substring(savedKey.length - 4) 
        : savedKey;
      setApiKeyState(maskedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      // Si la clé est masquée et verrouillée, ne pas la mettre à jour
      if (!isLocked || !isKeySet) {
        setApiKey(apiKey.trim());
        setIsKeySet(true);
        setIsLocked(true);
        toast.success('Clé API enregistrée avec succès');
      }
    } else {
      toast.error('Veuillez entrer une clé API valide');
    }
  };

  const handleClear = () => {
    setApiKey('');
    setApiKeyState('');
    setIsKeySet(false);
    setIsLocked(true);
    localStorage.removeItem('gemini_api_key');
    toast.info('Clé API supprimée');
  };

  const handleToggleLock = () => {
    if (isLocked) {
      // Déverrouiller et effacer le champ pour permettre la saisie
      setApiKeyState('');
      setIsLocked(false);
    } else {
      // Si on reverrouille sans soumettre, restaurer la clé masquée
      const savedKey = getApiKey();
      if (savedKey && isKeySet) {
        const maskedKey = savedKey.length > 4 
          ? '••••••••' + savedKey.substring(savedKey.length - 4) 
          : savedKey;
        setApiKeyState(maskedKey);
      }
      setIsLocked(true);
    }
  };

  return (
    <div className="mb-6">
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration requise</AlertTitle>
        <AlertDescription>
          Pour utiliser Gemini Flash Chat, vous devez fournir une clé API Google Gemini valide.
          Vous pouvez en obtenir une sur <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google AI Studio</a>.
        </AlertDescription>
      </Alert>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="password"
          placeholder="Entrez votre clé API Gemini..."
          value={apiKey}
          onChange={(e) => setApiKeyState(e.target.value)}
          className="flex-1"
          disabled={isKeySet && isLocked}
        />
        <div className="flex gap-2">
          {isKeySet && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleToggleLock}
            >
              {isLocked ? 'Modifier' : 'Annuler'}
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={(isKeySet && isLocked) || !apiKey.trim()}
          >
            {isKeySet ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          {isKeySet && (
            <Button type="button" variant="outline" onClick={handleClear}>
              Effacer
            </Button>
          )}
        </div>
      </form>
      
      {isKeySet && (
        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
          ✓ Clé API configurée
        </p>
      )}
    </div>
  );
};

export default ApiKeyInput;
