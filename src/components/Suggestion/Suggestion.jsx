import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './Suggestion.module.css';

export const Suggestion = () => {
    const initialValues = {
        name: '',
        email: '',
        message: '',
    };

    const Suggestionschema = Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        email: Yup.string().email('Invalid email format').required('Email is required!'),
        message: Yup.string().required('Message is required!'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        alert(JSON.stringify(values, null, 2));
        try {
            const res = await axios.post('http://localhost:5001/api/contacts', values);
            console.log('Submitted values:', res.data);
            // Show success message
            alert('Form submitted successfully!');
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            // Show error message
            alert('Failed to submit form. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <section className={styles.container} id="suggestion">
            <h2 className={styles.title}>Suggestion form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={Suggestionschema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>

                        <div className={styles.content}>
                            <div className="name">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} /> <br />
                                {formik.touched.name && formik.errors.name && (<span className="field-error">{formik.errors.name}</span>)}
                            </div>

                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} /> <br />
                                {formik.touched.email && formik.errors.email && (<span className="field-error">{formik.errors.email}</span>)}
                            </div>

                            <div>
                                <label htmlFor="message">Message</label>
                                <input type="text" className="form-control" name="message" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.message} /> <br />
                                {formik.touched.message && formik.errors.message && (<span className="field-error">{formik.errors.message}</span>)}
                            </div>

                            <div>
                                <button type="submit" disabled={formik.isSubmitting} className={styles.submitbtn}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik >
        </section>
    );
};