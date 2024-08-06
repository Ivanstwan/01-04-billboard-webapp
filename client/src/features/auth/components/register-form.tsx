import { Link, redirect, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/register-form';
import { AxiosErrorResponse } from '@/types/api';

// Define the schema
const RegisterSchema = z.object({
  email: z.string().email(),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const mutation = useMutation({
    mutationFn: (email: string) => registerUser(email),
    onSuccess: (data) => {
      toast.success(data?.message || 'Check your email');
      navigate({ to: '/login' });
    },
    onError: (error: AxiosErrorResponse, variables, context) => {
      toast.error(error?.response?.data?.message || 'Failed to register');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = RegisterSchema.safeParse({ email });

    if (!validation.success) {
      const issues: Record<string, any> = validation?.error?.issues || [];

      for (let i = 0; i < issues.length; i++) {
        toast.warning(issues[i].message);
      }
    } else {
      mutation.mutate(email);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your email below to register an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit}
            disabled={mutation?.isPending}
          >
            Register
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
