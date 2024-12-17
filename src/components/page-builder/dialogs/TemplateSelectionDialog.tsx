import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Template, templates } from '@/config/templates';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';

interface TemplateSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
  isPremiumUser?: boolean;
}

export function TemplateSelectionDialog({
  open,
  onClose,
  onSelect,
  isPremiumUser = false,
}: TemplateSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<Template['category']>('startup');

  const filteredTemplates = React.useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === template.category;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelectTemplate = (template: Template) => {
    if (template.isPremium && !isPremiumUser) {
      toast.error('Esta es una plantilla premium. Por favor, actualiza tu plan para acceder.');
      return;
    }
    onSelect(template);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Elegir Template</DialogTitle>
          <DialogDescription>
            Selecciona una plantilla para comenzar tu landing page
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-violet-500 transition-colors"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
              <TabsList className="bg-white/50 backdrop-blur-sm border border-gray-200">
                <TabsTrigger 
                  value="startup"
                  className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                >
                  Startup
                </TabsTrigger>
                <TabsTrigger 
                  value="portfolio"
                  className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger 
                  value="ecommerce"
                  className="data-[state=active]:bg-violet-500 data-[state=active]:text-white"
                >
                  E-commerce
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <Button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  variant="ghost"
                  className={cn(
                    "relative flex flex-col items-start h-auto p-0 rounded-lg border hover:border-violet-500 transition-all",
                    "bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md",
                    "group overflow-hidden"
                  )}
                >
                  <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                    <Image
                      src={template.thumbnail}
                      alt={template.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 w-full">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-medium text-gray-900">{template.name}</span>
                      {template.isPremium && (
                        <Badge variant="secondary" className="bg-violet-100 text-violet-700 border-violet-200">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 text-left">{template.description}</p>
                  </div>
                  <div className="absolute inset-0 rounded-lg border-2 border-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
