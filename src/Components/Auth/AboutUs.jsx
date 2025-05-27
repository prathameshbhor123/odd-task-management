import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutUs = () => {
    const [contactInfo, setContactInfo] = useState({
        registeredOffice: '',
        works: '',
        localInquiry: '',
        globalInquiry: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get('https://your-api-url.com/contact-info');
                setContactInfo({
                    registeredOffice: response.data.registeredOffice || "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
                    works: response.data.works || "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
                    localInquiry: response.data.localInquiry || "+91 9912567282",
                    globalInquiry: response.data.globalInquiry || "+1 569 3977856",
                    email: response.data.email || "support@gmail.com"
                });
            } catch (err) {
                setError('Failed to load contact information. Using default data.');
                console.error(err);
                // Fallback to default values
                setContactInfo({
                    registeredOffice: "Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat Lane, Girgaon, Mumbai - 400004 Maharashtra, India",
                    works: "18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India",
                    localInquiry: "+91 9912567282",
                    globalInquiry: "+1 569 3977856",
                    email: "support@gmail.com"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-200">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <section className="bg-gray-900 text-white border-b p-0">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row mt-20">
                    {/* Map Section */}
                    <div className="w-full md:w-1/2 p-0 h-96 md:h-auto">
                        <div className="relative w-full h-full">
                            <iframe
                                width="100%"
                                height="100%"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=digicorp&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Details Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8">
                        <h2 className="text-3xl font-bold mb-6">Contact Details</h2>

                        {/* Registered Office */}
                        <div className="mb-6">
                            <div className="flex items-start">
                                <span className="material-icons text-white mr-3">business</span>
                                <div>
                                    <p className="text-gray-300 mb-1">Registered Office</p>
                                    <p className="font-serif text-xl">
                                        {contactInfo.registeredOffice}
                                    </p>
                                </div>
                            </div>
                            <hr className="border-gray-700 my-4" />
                        </div>

                        {/* Works */}
                        <div className="mb-6">
                            <div className="flex items-start">
                                <span className="material-icons text-white mr-3">work</span>
                                <div>
                                    <p className="text-gray-300 mb-1">Works</p>
                                    <p className="font-serif text-xl">
                                        {contactInfo.works}
                                    </p>
                                </div>
                            </div>
                            <hr className="border-gray-700 my-4" />
                        </div>

                        {/* Phone Numbers */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Local Inquiry */}
                            <div>
                                <div className="flex items-start">
                                    <span className="material-icons text-white mr-3">call</span>
                                    <div>
                                        <p className="text-gray-300 mb-1">Local Inquiry</p>
                                        <a
                                            href={`tel:${contactInfo.localInquiry}`}
                                            className="font-serif text-xl hover:text-purple-300 transition-colors"
                                        >
                                            {contactInfo.localInquiry}
                                        </a>
                                    </div>
                                </div>
                                <hr className="border-gray-700 my-4" />
                            </div>

                            {/* Global Inquiry */}
                            <div>
                                <div className="flex items-start">
                                    <span className="material-icons text-white mr-3">call</span>
                                    <div>
                                        <p className="text-gray-300 mb-1">Global Inquiry</p>
                                        <a
                                            href={`tel:${contactInfo.globalInquiry}`}
                                            className="font-serif text-xl hover:text-purple-300 transition-colors"
                                        >
                                            {contactInfo.globalInquiry}
                                        </a>
                                    </div>
                                </div>
                                <hr className="border-gray-700 my-4" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <div className="flex items-start">
                                <span className="material-icons text-white mr-3">email</span>
                                <div>
                                    <p className="text-gray-300 mb-1">Email Address</p>
                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="font-serif text-xl hover:text-purple-300 transition-colors"
                                    >
                                        {contactInfo.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-6 p-3 bg-red-100 text-red-700 rounded">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;