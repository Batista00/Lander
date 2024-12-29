import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { aiLandingService, type AIAnalysis } from '@/services/ai/AILandingService';
import { Search, Layout, Sparkles, LineChart, Wand2, X } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  description: string;
  features: string[];
  isPremium: boolean;
}

interface AITemplateBrowserProps {
  businessContext?: any;
  onSelectTemplate: (templateId: string) => void;
}

export const AITemplateBrowser: React.FC<AITemplateBrowserProps> = ({
  businessContext,
  onSelectTemplate
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    // Cargar templates
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      // Aquí cargarías los templates desde tu servicio
      const loadedTemplates = await fetch('/api/templates').then(res => res.json());
      setTemplates(loadedTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = async (template: Template) => {
    setSelectedTemplate(template);
    setShowAnalysis(true);
    
    if (businessContext) {
      try {
        const templateAnalysis = await aiLandingService.analyzeTemplate(
          template.id,
          businessContext
        );
        setAnalysis(templateAnalysis);
      } catch (error) {
        console.error('Error analyzing template:', error);
      }
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header con búsqueda y filtros */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid de Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="object-cover w-full h-full"
                  />
                  {template.isPremium && (
                    <Badge
                      variant="default"
                      className="absolute top-2 right-2"
                    >
                      Premium
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {template.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Panel de Análisis */}
      <Sheet open={showAnalysis} onOpenChange={setShowAnalysis}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>AI Analysis</SheetTitle>
            <SheetDescription>
              Detailed analysis and recommendations for this template
            </SheetDescription>
          </SheetHeader>

          {selectedTemplate && analysis && (
            <div className="mt-6 space-y-6">
              {/* Match Score */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Industry Match
                </h4>
                <Progress value={analysis.industry.match} className="h-2" />
                <ul className="mt-2 space-y-1">
                  {analysis.industry.reasons.map((reason, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conversion Potential */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-primary" />
                  Conversion Potential
                </h4>
                <Progress value={analysis.conversion.potential} className="h-2" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Strengths</h5>
                    <ul className="space-y-1">
                      {analysis.conversion.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Areas to Improve</h5>
                    <ul className="space-y-1">
                      {analysis.conversion.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* SEO Analysis */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  SEO Score
                </h4>
                <Progress value={analysis.seo.score} className="h-2" />
                <ul className="mt-2 space-y-1">
                  {analysis.seo.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button variant="outline" onClick={() => setShowAnalysis(false)}>
                  Close
                </Button>
                <Button onClick={() => onSelectTemplate(selectedTemplate.id)}>
                  Use This Template
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
