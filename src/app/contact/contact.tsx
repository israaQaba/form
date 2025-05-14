'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>

        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                <Field
                  name="name"
                  className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600">Message</label>
                <Field
                  as="textarea"
                  name="message"
                  rows={4}
                  className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="message" component="div" className="text-sm text-red-500 mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
