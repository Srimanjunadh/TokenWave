import React from 'react';

interface TechLogoItem {
  name: string;
  image: string;
}

const ROW_1: TechLogoItem[] = [
  { name: 'Perplexity', image: '/logos/perplexity.png' },
  { name: 'Anthropic', image: '/logos/anthropic.png' },
  { name: 'CrewAI', image: '/logos/crewai.png' },
  { name: 'DSPy', image: '/logos/dspy.png' },
  { name: 'AutoGen', image: '/logos/autogen.png' },
  { name: 'GPT-4o', image: '/logos/gpt4o.png' },
  { name: 'Claude 3.5', image: '/logos/claude.png' },
  { name: 'Gemini Pro', image: '/logos/gemini.png' },
  { name: 'Python', image: '/logos/python.png' },
  { name: 'LangChain', image: '/logos/langchain.png' },
  { name: 'PyTorch', image: '/logos/pytorch.png' },
  { name: 'TensorFlow', image: '/logos/tensorflow.png' },
];

const ROW_2: TechLogoItem[] = [
  { name: 'PostgreSQL', image: '/logos/postgresql.png' },
  { name: 'Snowflake', image: '/logos/snowflake.png' },
  { name: 'Kafka', image: '/logos/kafka.png' },
  { name: 'AWS', image: '/logos/aws.png' },
  { name: 'Azure', image: '/logos/azure.png' },
  { name: 'GCP', image: '/logos/gcp.png' },
  { name: 'Pinecone', image: '/logos/pinecone.png' },
  { name: 'Qdrant', image: '/logos/qdrant.png' },
  { name: 'Milvus', image: '/logos/milvus.png' },
  { name: 'Weaviate', image: '/logos/weaviate.png' },
  { name: 'Datadog', image: '/logos/datadog.png' },
  { name: 'Confluent', image: '/logos/confluent.png' },
  { name: 'Terraform', image: '/logos/terraform.png' },
];

export const TechLogosTicker: React.FC = () => {
  return (
    <div className="mt-16 pt-8 border-t border-slate-200">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          Engineered with Enterprise Sovereign Tooling &amp; Infrastructure
        </span>
      </div>

      <div className="relative overflow-hidden py-4 space-y-10 sm:space-y-12">
        {/* Row 1: AI / Frameworks / Models */}
        <div className="flex space-x-12 sm:space-x-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...ROW_1, ...ROW_1].map((item, idx) => (
            <div
              key={`row1-${item.name}-${idx}`}
              className="flex flex-col items-center justify-center gap-2.5 min-w-[105px] sm:min-w-[125px] shrink-0 group select-none cursor-default"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 max-w-[50px] sm:max-w-[58px] w-auto h-auto object-contain"
                />
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-slate-700 group-hover:text-slate-950 transition-colors tracking-tight text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Cloud / Data / Infra */}
        <div className="flex space-x-12 sm:space-x-16 animate-marquee-reverse whitespace-nowrap hover:[animation-play-state:paused]">
          {[...ROW_2, ...ROW_2].map((item, idx) => (
            <div
              key={`row2-${item.name}-${idx}`}
              className="flex flex-col items-center justify-center gap-2.5 min-w-[105px] sm:min-w-[125px] shrink-0 group select-none cursor-default"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 max-w-[50px] sm:max-w-[58px] w-auto h-auto object-contain"
                />
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-slate-700 group-hover:text-slate-950 transition-colors tracking-tight text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
