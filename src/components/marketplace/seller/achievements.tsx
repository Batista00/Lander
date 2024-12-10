"use client";

import { SellerAchievement } from "@/types/seller";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface AchievementsProps {
  achievements: SellerAchievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Logros y Reconocimientos</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-start space-x-4 rounded-lg border p-4"
          >
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{achievement.name}</h4>
                <Badge variant="secondary">
                  {format(new Date(achievement.unlockedAt), "MMM yyyy")}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
