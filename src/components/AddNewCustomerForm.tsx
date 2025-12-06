// The form is implemented by lookin at shadcn field components documentation examples https://ui.shadcn.com/docs/components/field

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CustomerData } from "@/interfaces/customer";

export function AddNewCustomerFormInputs({
  formState,
  handleInputChange,
}: {
  formState: CustomerData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full max-w-md my-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="first-name">First name</FieldLabel>
            <Input
              name="firstname"
              id="first-name"
              type="text"
              placeholder="First name"
              value={formState.firstname}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last name</FieldLabel>
            <Input
              id="last-name"
              name="lastname"
              type="text"
              placeholder="Last name"
              value={formState.lastname}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="street-address">Street Address</FieldLabel>
            <Input
              name="streetaddress"
              id="street-address"
              type="text"
              placeholder="Street Address"
              value={formState.streetaddress}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="postcode">Postcode</FieldLabel>
            <Input
              id="postcode"
              name="postcode"
              type="text"
              placeholder="Postcode"
              value={formState.postcode}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              name="city"
              id="city"
              type="text"
              placeholder="City"
              value={formState.city}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              name="phone"
              id="phone"
              type="tel"
              placeholder="Phone"
              value={formState.phone}
              onChange={handleInputChange}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
