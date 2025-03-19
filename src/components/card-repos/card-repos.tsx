import { TGetReposUser } from '@/http';
import { Code, Star } from 'lucide-react';
import React from 'react';

type CardReposProps = {
  reposData: TGetReposUser;
};

const CardRepos: React.FC<CardReposProps> = ({ reposData }) => {
  return (
    <div className="px-4 py-3 rounded-xl hover:scale-105 transition-all border border-white">
      <div className="w-7 h-7 bg-white text-black items-center flex justify-center rounded-full">
        <a href={reposData.html_url} target="_blank" rel="noopener noreferrer">
          <Code className="w-4 h-4" />
        </a>
      </div>
      <div className="">
        <div className="flex justify-between mt-20">
          <div className="font-semibold text-[14px] truncate">
            {reposData.name}
          </div>
          <div className="inline-flex items-center gap-1">
            <div className="">{reposData.stargazers_count}</div>
            <Star className="w-4 h-4" />
          </div>
        </div>
        <div className="font-medium text-[11px]">{reposData.description}</div>
      </div>
    </div>
  );
};

export default CardRepos;
