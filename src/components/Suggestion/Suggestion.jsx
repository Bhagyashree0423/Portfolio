import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './Suggestion.module.css';
import { getImageUrl } from "../../utils";

console.log('Suggestion component loaded');

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

    return (
        <section className={styles.container} id="suggestion">
            <h2 className={styles.title}>Sugestion form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={Suggestionschema}
                onSubmit={(values,{setSubmitting}) => {
                    console.log('Submitted values:',values);
                    setSubmitting(false);
                    // resetForm();
                }}
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

                        {/* <img
                            src={getImageUrl("suggestion/suggestionImage.jpeg")}
                            alt="Me filling form"
                            className={styles.suggestionImg}
                        /> */}

                    </form>
                )}
            </Formik >
        </section>
    );
};