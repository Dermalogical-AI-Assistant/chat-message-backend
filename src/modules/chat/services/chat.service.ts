import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private readonly cuteTitles = [
    "Glow Getter Chat 💖",
    "Beauty Bestie Session ✨",
    "Sparkle & Shine Talk 🌟",
    "Pretty & Pampered Convo 💅",
    "Flawless Beauty Huddle 💄",
    "Glow-Up Therapy 🌸",
    "Skin Love Diary 💕",
    "Clear & Radiant Chat ✨",
    "Dewy Dreams Session 💦",
    "Makeup Magic Hour �",
    "Glam Squad Convo 💋",
    "Lipstick & Laughs 💄😂",
    "Your Beauty Adventure 🌈",
    "Pout & Pamper Time 💋",
    "Beauty Secrets Revealed 🤫"
  ];

  public generateChatSessionTitle(): string {
    const randomIndex = Math.floor(Math.random() * this.cuteTitles.length);
    return this.cuteTitles[randomIndex];
  }
}