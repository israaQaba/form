'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EmailJSResponseStatus } from 'emailjs-com';

export default function HomePage() {
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (values: { name: string; surname: string; email: string; country: string; dob: string; message: string }): Promise<EmailJSResponseStatus> => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
    return emailjs.send(serviceID, templateID, values, publicKey);
  };

  const cutoffDate = new Date();
  cutoffDate.setFullYear(cutoffDate.getFullYear() - 16);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-2xl rounded-3xl p-12 w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-300">
          Get in Touch
        </h2>

        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            country: '',
            dob: '',
            message: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            surname: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            country: Yup.string().required('Required'),
            dob: Yup.date()
              .required('Required')
              .test('age', 'You must be at least 16 years old', (value) => {
                if (!value) return false;
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
                }
                return age >= 16;
              }),
            message: Yup.string()
              .min(10, 'At least 10 characters')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setMessageSent(false);
            sendEmail(values)
              .then(() => {
                setMessageSent(true);
                resetForm();
              })
              .catch((error) => {
                console.error('Email send error:', error);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Name & Surname */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['name', 'surname'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-300 capitalize">
                      {field}
                    </label>
                    <Field
                      name={field}
                      className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Enter your ${field}`}
                    />
                    <ErrorMessage name={field} component="div" className="text-red-400 text-sm mt-1" />
                  </div>
                ))}
              </div>

              {/* Country & Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300">
                    Country
                  </label>
                  <Field
                    as="select"
                    name="country"
                    className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="" className="bg-gray-800 text-gray-200">Select your country</option>
                    {[
                      'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan',
                      'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi',
                      'Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic',
                      'Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','East Timor (Timor-Leste)','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia',
                      'Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana',
                      'Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan',
                      'Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg',
                      'Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar',
                      'Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda',
                      'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States of America','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
                    ].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="country" component="div" className="text-red-400 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-300">
                    Date of Birth
                  </label>
                  <Field
                    name="dob"
                    type="date"
                    max={cutoffDate.toISOString().split('T')[0]}
                    className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="dob" component="div" className="text-red-400 text-sm mt-1" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows={4}
                  className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your message..."
                />
                <ErrorMessage name="message" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Success Message */}
              {messageSent && (
                <p className="text-center text-green-400 font-medium mt-4">
                  ✅ Your message has been sent!
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

