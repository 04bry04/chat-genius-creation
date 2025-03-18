
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

  useEffect(() => {
    // Vérifier si une clé existe déjà
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKeyState(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      setIsKeySet(true);
      toast.success('Clé API enregistrée avec succès');
    } else {
      toast.error('Veuillez entrer une clé API valide');
    }
  };

  const handleClear = () => {
    setApiKey('');
    setApiKeyState('');
    setIsKeySet(false);
    localStorage.removeItem('gemini_api_key');
    toast.info('Clé API supprimée');
  };

  return (
    <div className="mb-6">
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration requise</AlertTitle>
        <AlertDescription>
          Pour utiliser Gemini Flash Chat, vous devez fournir une clé API Google Gemini valide.
          Vous pouvez en obtenir une sur <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google AI Studio</a>.
        </AlertDescription>
      </Alert>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="password"
          placeholder="Entrez votre clé API Gemini..."
          value={apiKey}
          onChange={(e) => setApiKeyState(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={!apiKey.trim()}>
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
