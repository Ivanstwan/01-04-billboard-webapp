import {
  Link,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import jwt_decode from 'jwt-decode';

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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosErrorResponse } from '@/types/api';
import { registerCreateUser } from '../api/register-create-user';

// Define the schema
const RegisterCreateUserSchema = z.object({
  password: z.string().min(8).max(64),
  token: z.string(),
});

const RegisterCreateUser = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search as string);
  const token = queryParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [decoded, setDecoded] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setDecoded(decodedToken);
      } catch (error) {
        toast.error('Token not valid');
        // Optionally, you could redirect the user or clear the token
        navigate({ to: '/register' }); // Example of redirecting to an error page
      }
    }
  }, [token]);

  const mutation = useMutation({
    mutationFn: (data: { password: string; token: string }) =>
      registerCreateUser(data.password, data.token),
    onSuccess: (data) => {
      toast.success(data?.message || 'Account created');
      navigate({ to: '/login' });
    },
    onError: (error: AxiosErrorResponse, variables, context) => {
      toast.error(error?.response?.data?.message || 'Failed to create account');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = RegisterCreateUserSchema.safeParse({ password, token });

    if (!validation.success) {
      const issues: Record<string, any> = validation?.error?.issues || [];

      for (let i = 0; i < issues.length; i++) {
        toast.warning(issues[i].message);
      }
    } else {
      mutation.mutate({ password, token });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        {decoded?.email && (
          <CardDescription>
            Your Email: <b>{decoded.email}</b>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit}
            disabled={mutation?.isPending}
          >
            Create account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterCreateUser;
