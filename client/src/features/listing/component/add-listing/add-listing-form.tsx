import React from 'react';

import { useForm } from '@tanstack/react-form';
import type { FieldApi } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ZodValidator, zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

const ListingSchema = z.object({
  type: z.string(),
  latitude: z
    .string()
    // Regex to match valid decimal number format with max 6 decimal places
    .refine((val) => /^-?\d+(\.\d{1,6})?$/.test(val), {
      message:
        'Latitude must be a valid decimal number with up to 6 decimal places',
    })
    .transform((val) => parseFloat(val)) // Transform the string to float
    .refine((val) => !isNaN(val) && val >= -90 && val <= 90, {
      message: 'Latitude must be a valid number between -90 and 90',
    }),
  longitude: z
    .string()
    .refine((val) => /^-?\d+(\.\d{1,6})?$/.test(val), {
      message:
        'Longitude must be a valid decimal number with up to 6 decimal places',
    })
    .transform((val) => parseFloat(val)) // Transform the string to number
    .refine((val) => !isNaN(val) && val >= -180 && val <= 180, {
      message: 'Longitude must be a valid number between -180 and 180',
    }),
  height: z
    .string()
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message:
        'Height must be a valid number or decimal up to 2 decimal places',
    })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Height must be a valid number',
    }),
  width: z
    .string()
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Width must be a valid number or decimal up to 2 decimal places',
    })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Width must be a valid number',
    }),
  details: z
    .string()
    .max(100, { message: 'Detail must be no more than 100 characters long' })
    .optional(),
  lighting: z.boolean().default(false),
  // if want to be optional, check below
  // width: z
  //   .string()
  //   .trim()
  //   .optional()
  //   .transform((val) => (val === '' ? undefined : val))
  //   .refine((val) => val === undefined || /^\d+(\.\d{1,2})?$/.test(val), {
  //     message: 'Width must be a valid number or decimal up to 2 decimal places',
  //   })
  //   .transform((val) => (val ? parseFloat(val) : undefined))
  //   .refine((val) => val === undefined || (!isNaN(val) && val > 0), {
  //     message: 'Width must be a valid number',
  //   }),
});

type Listing = z.infer<typeof ListingSchema>;

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="mt-1 text-sm text-destructive">
          {field.state.meta.errors.join(', ')}
        </em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

const AddListingForm = () => {
  const navigate = useNavigate();

  const form = useForm<Listing, ZodValidator>({
    validators: { onChange: ListingSchema },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      console.log('SUBMIT');

      // Do something with form data
      console.log(value);
      toast.success('Listing added');
      navigate({ to: '/manage/my-listing' });
    },
  });

  return (
    <>
      <h1>Simple Add Listing Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="grid w-full items-start gap-6"
      >
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <div className="grid gap-3">
            <div>
              <form.Field
                name="type"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'A type is required' : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes('error') && 'No "error" allowed in type'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <Label htmlFor={field.name}>Type:</Label>
                      <div className="relative flex w-fit items-center">
                        <select
                          className="flex h-9 w-[180px] appearance-none items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        >
                          <option value="" className="hidden">
                            Select type
                          </option>
                          <option value="A">Billboard</option>
                          <option value="B">Videotron</option>
                          <option value="C">LED Screen</option>
                          <option value="D">Banner</option>
                          <option value="E">Digital Display</option>
                        </select>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-3 h-4 w-4 opacity-50"
                          aria-hidden="true"
                        >
                          <path
                            d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Location</legend>
          <div className="grid gap-3">
            <div>
              <form.Field
                name="latitude"
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Latitude:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <div>
              <form.Field
                name="longitude"
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Longitude:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Size (meter)
          </legend>
          <div className="grid gap-3">
            <div>
              <form.Field
                name="height"
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Height:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <div>
              <form.Field
                name="width"
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Width:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Details</legend>
          <div className="grid gap-3">
            <div>
              <form.Field
                name="details"
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Notes:</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Textarea>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <div>
              <form.Field
                name="lighting"
                children={(field) => (
                  <>
                    <div className="flex items-center gap-4">
                      <Label htmlFor={field.name}>
                        Does your advertisement have night lighting?
                      </Label>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onBlur={field.handleBlur}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked)
                        }
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          </div>
        </fieldset>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              onClick={() => console.log('test')}
            >
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </>
  );
};

export default AddListingForm;
