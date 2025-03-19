'use client';

import CardItem from '@/components/card-item/cart-item';
import SkeletonLoading from '@/components/skeleton-loading/SkeletonLoading';
import { useGithubUsername } from '@/hooks/useGithubUsername';
import { filterUsernameSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';
import FormInput from '../components/form-input/form-input';

type TFormSchema = z.infer<typeof filterUsernameSchema>;

export default function Home() {
  const [username, setUsername] = React.useState<string>('');
  const [debouncedUsername] = useDebounce(username, 500);

  const formFilter = useForm<TFormSchema>({
    resolver: zodResolver(filterUsernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmitForm = (val: TFormSchema) => {
    setUsername(val.username);
  };

  const { data: githubUserData, isLoading } =
    useGithubUsername(debouncedUsername);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center text-balance flex flex-col mt-20">
        <span className="font-black text-4xl">Find your repository here</span>
        <span className="font-semibold text-white/70 mt-2">
          Just search username and get the repository
        </span>
      </div>

      <div className="mt-10">
        <FormInput formFilter={formFilter} onSubmitForm={onSubmitForm} />
      </div>

      <div className="mt-2">
        {!isLoading && username ? (
          <div className="mb-4 flex justify-between items-center px-2">
            {`Showing users for "${username}"`}
          </div>
        ) : (
          ''
        )}

        {isLoading ? <SkeletonLoading /> : null}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!isLoading && githubUserData && githubUserData.length > 0
            ? githubUserData.map((item, index) => (
                <CardItem
                  key={index}
                  avatar_url={item.avatar_url}
                  login={item.login}
                  repos_url={item.html_url}
                />
              ))
            : null}
        </div>

        {/* {(!githubUserData || githubUserData?.length < 1) && (
          <div className="items-center mt-4">
            <FuzzyText enableHover={false} fontSize={60}>
              NOT FOUND
            </FuzzyText>
          </div>
        )} */}
      </div>
    </div>
  );
}
