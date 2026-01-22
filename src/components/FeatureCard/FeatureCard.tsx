import { type FC } from "react";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  number,
  title,
  description,
}) => (
  <div className="p-8 rounded-3xl bg-bg-card border border-ui-border hover:border-brand/30 transition-colors text-left group">
    <div className="text-brand text-2xl mb-4 italic font-black group-hover:scale-110 transition-transform">
      {number}
    </div>
    <h3 className="text-lg font-bold mb-2 uppercase ">{title}</h3>
    <p className="text-text-dim text-sm leading-relaxed">{description}</p>
  </div>
);
