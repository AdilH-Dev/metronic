import { MiscHelp } from '@/partials/misc';
import { SecurityLog } from './blocks';
import { useState } from 'react';
import { ContentLoader } from '../../../../components/loaders/ContentLoader';
const AccountSecurityLogContent = ({ date, toDate, searchTerms }) => {
  //   const jsonData = {
  //     "headers": {
  //         "Authorization": "Bearer YOUR_ACCESS_TOKEN",
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         "Request-Id": "123e4567-e89b-12d3-a456-426614174000"
  //     },
  //     "body": {
  //         "InstructionIdentification": "TXN123456789",
  //         "EndToEndIdentification": "PaymentForInvoice123",
  //         "InstructedAmount": {
  //             "Amount": "1000.00",
  //             "Currency": "EUR"
  //         },
  //         "DebtorAccount": {
  //             "SchemeName": "IBAN",
  //             "Identification": "GB29NWBK60161331926819"
  //         },
  //         "CreditorAccount": {
  //             "SchemeName": "IBAN",
  //             "Identification": "DE89370400440532013000"
  //         },
  //         "CreditorName": "John Doe",
  //         "RemittanceInformation": "Invoice 12345 Payment"
  //     }
  // };
  const [loading2, setLoading2] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid gap-5 lg:gap-7.5 lg:grid-cols-2">
        <SecurityLog
          date={date}
          toDate={toDate}
          searchTerms={searchTerms}
          setJsonData={setJsonData}
          setLoading2={setLoading2}
        />
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">JSON Data</h3>
          </div>
          <div className="card-body">
            <div className="grid min-w-full">
              <div className="scrollable-x-auto">
                {loading2 ? (
                  <div className="text-center flex justify-center py-2 border-0">
                    <ContentLoader />
                  </div>
                ) : (
                  <pre className="p-5">
                    <code>{jsonData && JSON.stringify(jsonData, null, 2)}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <MiscHelp /> */}
    </div>
  );
};
export { AccountSecurityLogContent };
