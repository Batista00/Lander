import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Wand2, Layout, Type, Palette, LineChart } from 'lucide-react';
import { aiLandingService } from '@/services/ai/AILandingService';
import type {
  AIContentSuggestion,
  AIComponentAnalysis,
  BusinessContext,
  AIEditorState
} from '@/types/ai';

interface AIEditorProps {
  landingPageId: string;
  businessContext: BusinessContext;
}

export const AIEditor: React.FC<AIEditorProps> = ({
  landingPageId,
  businessContext
}) => {
  const [editorState, setEditorState] = useState<AIEditorState>({
    activeComponent: null,
    suggestions: [],
    analysis: null,
    history: [],
    autoSave: true,
    undoStack: [],
    redoStack: []
  });

  const [showAIPanel, setShowAIPanel] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState('content');

  // Manejar selección de componente
  const handleComponentSelect = async (componentId: string) => {
    setEditorState(prev => ({ ...prev, activeComponent: componentId }));
    
    try {
      // Obtener análisis y sugerencias para el componente
      const analysis = await aiLandingService.analyzeComponent(componentId, businessContext);
      const suggestions = await aiLandingService.generateContentSuggestions(
        componentId,
        businessContext
      );

      setEditorState(prev => ({
        ...prev,
        analysis,
        suggestions
      }));
    } catch (error) {
      console.error('Error analyzing component:', error);
    }
  };

  // Generar contenido con IA
  const handleGenerateContent = async (type: string) => {
    if (!editorState.activeComponent) return;

    setGenerating(true);
    try {
      const newSuggestions = await aiLandingService.generateContentSuggestions(
        editorState.activeComponent,
        businessContext,
        type
      );

      setEditorState(prev => ({
        ...prev,
        suggestions: [...prev.suggestions, ...newSuggestions]
      }));
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setGenerating(false);
    }
  };

  // Aplicar sugerencia
  const handleApplySuggestion = (suggestion: AIContentSuggestion) => {
    // Implementar lógica para aplicar la sugerencia al componente
    setEditorState(prev => ({
      ...prev,
      history: [
        ...prev.history,
        {
          action: 'apply_suggestion',
          timestamp: new Date(),
          componentId: prev.activeComponent!
        }
      ]
    }));
  };

  return (
    <div className="h-full flex">
      {/* Editor Principal */}
      <div className="flex-1 p-6">
        {/* Barra de herramientas */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIPanel(!showAIPanel)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Device View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Undo
            </Button>
            <Button variant="outline" size="sm">
              Redo
            </Button>
            <Button variant="default" size="sm">
              Save
            </Button>
          </div>
        </div>

        {/* Área de edición */}
        <div className="border rounded-lg h-[calc(100vh-200px)] bg-background">
          {/* Implementar el editor visual aquí */}
        </div>
      </div>

      {/* Panel de IA */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l bg-card"
          >
            <div className="p-4">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  {/* Generación de contenido */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <h3 className="font-medium">Generate Content</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateContent('headline')}
                            disabled={generating}
                          >
                            <Type className="w-4 h-4 mr-2" />
                            Headline
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateContent('description')}
                            disabled={generating}
                          >
                            <Type className="w-4 h-4 mr-2" />
                            Description
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sugerencias */}
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {editorState.suggestions.map((suggestion, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <Badge>{suggestion.type}</Badge>
                              <Badge variant="secondary">
                                {suggestion.confidence}% match
                              </Badge>
                            </div>
                            <p className="text-sm mb-4">{suggestion.content}</p>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApplySuggestion(suggestion)}
                              >
                                Apply
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="design" className="space-y-4">
                  {/* Sugerencias de diseño */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <h3 className="font-medium">Design Suggestions</h3>
                        {editorState.analysis?.suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-lg text-sm"
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Alternativas de componentes */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4">Alternative Components</h3>
                      {editorState.analysis?.alternatives.map((alt, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg mb-2"
                        >
                          <div>
                            <p className="font-medium">{alt.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {alt.reason}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  {/* Análisis del componente actual */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Component Analysis</h3>
                          <Badge variant="secondary">
                            {editorState.analysis?.effectiveness}% effective
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          {editorState.analysis?.suggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="p-3 border rounded-lg text-sm flex items-start gap-2"
                            >
                              <span className="mt-1">•</span>
                              <span>{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Historial de cambios */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4">Change History</h3>
                      <div className="space-y-2">
                        {editorState.history.map((change, index) => (
                          <div
                            key={index}
                            className="text-sm text-muted-foreground"
                          >
                            {change.action} - {change.timestamp.toLocaleTimeString()}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
