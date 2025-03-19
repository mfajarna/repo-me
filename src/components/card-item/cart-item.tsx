'use client';

import { getGithubRepo, TGetReposUser } from '@/http';
import { useMutation } from '@tanstack/react-query';
import { Github } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import CardRepos from '../card-repos/card-repos';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type CardItemProps = {
  avatar_url: string;
  login: string;
  repos_url: string;
};

const CardItem: React.FC<CardItemProps> = ({
  avatar_url,
  login,
  repos_url,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [dataRepo, setDataRepo] = React.useState<any[]>([]);

  const mutation = useMutation({
    mutationFn: getGithubRepo,
    onSuccess: (data: any) => {
      setDataRepo(data);
    },
  });

  const dialogOpenHandle = () => {
    setIsDialogOpen(true);

    mutation.mutate(login);
  };

  return (
    <div>
      <SpotlightCard
        className="h-[15rem] hover:scale-105"
        spotlightColor="rgba(0, 229, 255, 0.2)"
        onClick={dialogOpenHandle}
      >
        <div className="flex mx-auto items-center">
          <div className="">
            <Image
              src={avatar_url}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full"
            />

            <div className="text-center items-center my-5">{login}</div>

            <a href={repos_url} target="_blank" rel="noopener noreferrer">
              <Button variant={'outline'} className="w-full rounded-xl">
                <Github />
              </Button>
            </a>
          </div>
        </div>
      </SpotlightCard>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {/* Empty trigger (handled by state) */}
          <span></span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[768px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Repository</DialogTitle>
            <DialogDescription>
              This is collections repository of {`${login}`}
            </DialogDescription>
          </DialogHeader>

          {/* Dialog Content */}
          {mutation.isPending ? (
            <div>Loading ...</div>
          ) : (
            <div className="grid  grid-cols-2 md:grid-cols-3 gap-4">
              {dataRepo.map((item: TGetReposUser, index) => (
                <CardRepos key={index} reposData={item} />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardItem;
