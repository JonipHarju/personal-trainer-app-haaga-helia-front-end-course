import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import type { TrainingData } from "@/interfaces/training";
import type { Customer } from "@/interfaces/customer";
import { SingleDatePicker } from "./SingleDatePicker";

type Props = {
  formState: TrainingData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: Date | undefined) => void;
  customers: Customer[];
  handleCustomerChange: (customerLink: string) => void;
};

export function AddNewTrainingFormInputs({
  formState,
  handleInputChange,
  handleDateChange,
  customers,
  handleCustomerChange,
}: Props) {
  return (
    <div className="w-full max-w-md my-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="activity">Activity</FieldLabel>
            <Input
              name="activity"
              id="activity"
              type="text"
              placeholder="Activity"
              value={formState.activity}
              onChange={handleInputChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="duration">Duration (minutes)</FieldLabel>
            <Input
              name="duration"
              id="duration"
              type="number"
              min={1}
              placeholder="Duration"
              value={formState.duration}
              onChange={handleInputChange}
              required
            />
          </Field>
          <Field>
            <SingleDatePicker
              value={formState.date}
              onChange={handleDateChange}
            />
          </Field>
          <Field>
            <FieldLabel>Customer</FieldLabel>
            <Select
              value={formState.customer}
              onValueChange={handleCustomerChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer._links.self.href}
                    value={customer._links.self.href}
                  >
                    {customer.firstname} {customer.lastname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
