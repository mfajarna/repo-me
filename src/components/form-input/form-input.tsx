import { Search } from 'lucide-react';
import React from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';

type FormInputProps = {
  formFilter: any;
  onSubmitForm: (val: any) => void | undefined;
};

const FormInput: React.FC<FormInputProps> = ({ formFilter, onSubmitForm }) => {
  return (
    <Form {...formFilter}>
      <form onSubmit={formFilter.handleSubmit(onSubmitForm)}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:opacity-75 opacity-50" />
          <div className="relative bg-[#1A1A1A] rounded-xl border border-gray-700/50 shadow-2xl">
            <div className="flex items-center px-4 py-3">
              <FormField
                name={'username'}
                control={formFilter.control}
                render={({ field }) => (
                  <FormControl>
                    <FormItem className="w-full focus:outline-none rounded-lg">
                      <Input
                        placeholder="Search username github here..."
                        className="bg-transparent text-gray-200 text-md placeholder:text-gray-500 focus:outline-none rounded-lg"
                        {...field}
                      />
                    </FormItem>
                  </FormControl>
                )}
              />

              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-800 rounded-md transition-colors">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FormInput;
