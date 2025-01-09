import React from 'react';
import {
  Bird,
  Book,
  Bot,
  Car,
  Clapperboard,
  Code2,
  CornerDownLeft,
  Image,
  ImagePlay,
  LifeBuoy,
  Mic,
  MonitorPlay,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  Signature,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from 'lucide-react';

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
  category: z.string(),
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
      {/* {field.state.meta.isValidating ? 'Validating...' : null} */}
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
      // navigate({ to: '/manage/my-listing' });
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
          <legend className="-ml-1 px-1 text-sm font-medium">
            Advertisement Type
          </legend>
          <div className="grid gap-3">
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
                    <div className="relative flex items-center">
                      <Select
                        onValueChange={(string) => field.handleChange(string)}
                      >
                        <SelectTrigger
                          id="type"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="printed">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Image className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  <span className="font-medium text-foreground">
                                    Printed
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Traditional printed advertisement. Image
                                  doesn't move or change.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="digital">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <ImagePlay className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  <span className="font-medium text-foreground">
                                    Digital
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Dynamic advertisements. Using any
                                  LED/LCD/digital screen for showing
                                  images/videos.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
            <form.Field
              name="category"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'A category is required' : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') && 'No "error" allowed in category'
                  );
                },
              }}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <Label htmlFor={field.name}>Category:</Label>
                    <div className="relative flex items-center">
                      <Select
                        onValueChange={(string) => field.handleChange(string)}
                      >
                        <SelectTrigger
                          id="category"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="billboard">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MonitorPlay className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  <span className="font-medium text-foreground">
                                    Billboard
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Billboard or Videotron (digital billboard)
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="theater">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Clapperboard className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Movie{' '}
                                  <span className="font-medium text-foreground">
                                    Theater
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  On a movie theater.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="mobile">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Car className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  <span className="font-medium text-foreground">
                                    Mobile
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  On bus/taxi/car/any moving vehicle.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="other">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <Signature className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Unique{' '}
                                  <span className="font-medium text-foreground">
                                    Other
                                  </span>
                                </p>
                                <p className="text-xs" data-description>
                                  Advertisement medium that is not on the list
                                  yet.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
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
