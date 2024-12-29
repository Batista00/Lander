import React, { useState } from 'react';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { aiTemplateService, TemplateAnalysis, AITemplateEnhancement } from '@/services/ai/AITemplateService';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AITemplateAdvisorProps {
  onTemplateSelect: (templateId: string) => void;
}

export const AITemplateAdvisor: React.FC<AITemplateAdvisorProps> = ({
  onTemplateSelect
}) => {
  const { setWorkflowState } = useAIWorkflow();
  const [industry, setIndustry] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState('');
  const [brandTone, setBrandTone] = useState('');
  const [brandValues, setBrandValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateAnalysis, setTemplateAnalysis] = useState<TemplateAnalysis | null>(null);
  const [enhancements, setEnhancements] = useState<AITemplateEnhancement | null>(null);

  const handleAnalyzeTemplate = async (templateId: string) => {
    setLoading(true);
    try {
      const analysis = await aiTemplateService.analyzeTemplate(
        templateId,
        {
          industry,
          targetAudience,
          goals,
          brand: {
            tone: brandTone,
            values: brandValues
          }
        }
      );
      setTemplateAnalysis(analysis);
      
      const templateEnhancements = await aiTemplateService.generateEnhancements(
        templateId,
        analysis
      );
      setEnhancements(templateEnhancements);
      setSelectedTemplate(templateId);
    } catch (error) {
      console.error('Error analyzing template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Configuración Inicial */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Tell us about your business</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Brand Tone</label>
              <Select onValueChange={setBrandTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your brand tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="innovative">Innovative</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Audience</label>
            <Input
              placeholder="Describe your ideal customer (e.g., 'Small business owners aged 30-50')"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Business Goals</label>
            <Select onValueChange={(value) => setGoals([...goals, value])}>
              <SelectTrigger>
                <SelectValue placeholder="Add your goals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead_generation">Lead Generation</SelectItem>
                <SelectItem value="sales">Direct Sales</SelectItem>
                <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                <SelectItem value="engagement">User Engagement</SelectItem>
                <SelectItem value="education">Education/Information</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {goals.map((goal, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setGoals(goals.filter((_, i) => i !== index))}
                >
                  {goal.replace('_', ' ')} ×
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Análisis de Template */}
      {selectedTemplate && templateAnalysis && (
        <Card className="p-6">
          <Tabs defaultValue="analysis">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="enhancements">AI Enhancements</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry Match</label>
                  <Progress value={templateAnalysis.industry.match} />
                  <ul className="mt-2 space-y-1 text-sm">
                    {templateAnalysis.industry.reasons.map((reason, i) => (
                      <li key={i} className="text-muted-foreground">• {reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Conversion Potential</label>
                  <Progress value={templateAnalysis.conversion.potential} />
                  <ul className="mt-2 space-y-1 text-sm">
                    {templateAnalysis.conversion.strengths.map((strength, i) => (
                      <li key={i} className="text-muted-foreground">• {strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="enhancements">
              {enhancements && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Layout Suggestions</h4>
                      <ul className="space-y-1 text-sm">
                        {enhancements.layout.suggestions.map((suggestion, i) => (
                          <li key={i} className="text-muted-foreground">• {suggestion}</li>
                        ))}
                      </ul>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Content Recommendations</h4>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Headlines:</p>
                        {enhancements.content.headlines.map((headline, i) => (
                          <p key={i} className="text-sm text-muted-foreground">{headline}</p>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="preview">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                Template Preview
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
              Back to Templates
            </Button>
            <Button onClick={() => onTemplateSelect(selectedTemplate)}>
              Use This Template
            </Button>
          </div>
        </Card>
      )}

      {/* Lista de Templates */}
      {!selectedTemplate && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí irían tus templates con la opción de análisis */}
          <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleAnalyzeTemplate('template1')}>
            <div className="aspect-video bg-muted rounded-lg mb-4" />
            <h3 className="font-semibold">Modern Business Template</h3>
            <p className="text-sm text-muted-foreground">Perfect for professional services</p>
          </Card>
          {/* Más templates... */}
        </div>
      )}
    </div>
  );
};
