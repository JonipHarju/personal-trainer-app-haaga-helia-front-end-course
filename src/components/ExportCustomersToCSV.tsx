/**
 * Using this library for CSV exporting https://www.npmjs.com/package/react-csv
 * The library didnt come with types so I needed to install typs seperately with:
 *   - npm i --save-dev @types/react-csv
 *
 * After that Vite was throwing following errors:
 *   [ERROR] Could not resolve "prop-types"
 *   node_modules/react-csv/src/metaProps.js:2:53:
 *     2 │ import { string, array, oneOfType, bool, func } from 'prop-types';
 *
 * I then installed manually the prop-types package(https://www.npmjs.com/package/prop-types) with:
 *      - npm install --save prop-types
 * After this the library worked fine.
 */

import type { Customer } from "@/interfaces/customer";
import { CSVLink } from "react-csv";
import { Button } from "./ui/button";

type ExportCustomersToCSVProps = {
  customers: Customer[];
};

export default function ExportCustomersToCSV({
  customers,
}: ExportCustomersToCSVProps) {
  const customerHeaders = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Street Address", key: "streetaddress" },
    { label: "Postcode", key: "postcode" },
    { label: "City", key: "city" },
  ];

  const csvData = customers.map((customer) => ({
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    streetaddress: customer.streetaddress,
    postcode: customer.postcode,
    city: customer.city,
  }));

  return (
    <Button variant="default" className="max-w-fi">
      <CSVLink
        data={csvData}
        headers={customerHeaders}
        separator=";"
        filename="customers.csv"
      >
        export customers
      </CSVLink>
    </Button>
  );
}
