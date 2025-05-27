import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        addhar: '',
        phone: '',
        subject: '',
        query: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setSendStatus(null);

        try {
            const response = await emailjs.send(
                'service_724wzv7',
                'template_nlwc6ay',
                form,
                's5-WDs-fb8SgwI_nh'
            );

            console.log('SUCCESS!', response.status, response.text);
            setSendStatus({ success: true, message: 'Message sent successfully!' });
            setForm({
                name: '',
                email: '',
                addhar: '',
                phone: '',
                subject: '',
                query: ''
            });
        } catch (error) {
            console.log('FAILED...', error);
            setSendStatus({ success: false, message: 'Failed to send message. Please try again.' });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="bg-gray-900 text-white py-8 border-b ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8 mt-20">
                    {/* Contact Form Section */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-6">Get in touch!</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                {/* Full Name */}
                                <div className="relative">
                                    <label htmlFor="name" className="block text-gray-300 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <label htmlFor="email" className="block text-gray-300 mb-1">Email Id</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                {/* Aadhar Number */}
                                <div className="relative">
                                    <label htmlFor="addhar" className="block text-gray-300 mb-1">Aadhar No</label>
                                    <input
                                        type="text"
                                        id="addhar"
                                        name="addhar"
                                        value={form.addhar}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Mobile Number */}
                                <div className="relative">
                                    <label htmlFor="phone" className="block text-gray-300 mb-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Subject */}
                                <div className="relative">
                                    <label htmlFor="subject" className="block text-gray-300 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            {/* Query */}
                            <div className="relative">
                                <label htmlFor="query" className="block text-gray-300 mb-1">Add your Query</label>
                                <textarea
                                    id="query"
                                    name="query"
                                    value={form.query}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSending ? 'Sending...' : 'Send Message'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setForm({
                                        name: '',
                                        email: '',
                                        addhar: '',
                                        phone: '',
                                        subject: '',
                                        query: ''
                                    })}
                                    className="px-6 py-2 border border-gray-300 hover:bg-gray-800 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Status Message */}
                            {sendStatus && (
                                <div className={`mt-4 p-3 rounded-lg ${sendStatus.success ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                                    {sendStatus.message}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Details Section */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-6">Contact Details</h2>
                        <div className="space-y-4">
                            {/* Registered Office */}
                            <div>
                                <div className="flex items-start">
                                    <span className="material-icons text-white mr-3">business</span>
                                    <div>
                                        <p className="text-gray-300 mb-1">Registered Office</p>
                                        <p className="font-serif text-gray-200">
                                            Shop No 56, Gr Flr, Bedekar Sadan No 3, Gharpure Path, Formally Known As Mugbhat
                                            Lane, Girgaon, Mumbai - 400004 Maharashtra, India
                                        </p>
                                    </div>
                                </div>
                                <hr className="border-gray-700 my-4" />
                            </div>

                            {/* Works */}
                            <div>
                                <div className="flex items-start">
                                    <span className="material-icons text-white mr-3">work</span>
                                    <div>
                                        <p className="text-gray-300 mb-1">Works</p>
                                        <p className="font-serif text-gray-200">
                                            18th Road, Opp Electric Office, Chembur (east), Mumbai - 400071 Maharashtra, India
                                        </p>
                                    </div>
                                </div>
                                <hr className="border-gray-700 my-4" />
                            </div>

                            {/* Phone Numbers */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Local Inquiry */}
                                <div>
                                    <div className="flex items-start">
                                        <span className="material-icons text-white mr-3">call</span>
                                        <div>
                                            <p className="text-gray-300 mb-1">Local Inquiry</p>
                                            <a
                                                href="tel:+919912567282"
                                                className="font-serif text-gray-200 hover:text-purple-300 transition-colors"
                                            >
                                                +91 9912567282
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
                                                href="tel:+15693977856"
                                                className="font-serif text-gray-200 hover:text-purple-300 transition-colors"
                                            >
                                                +1 569 3977856
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
                                            href="mailto:support@gmail.com"
                                            className="font-serif text-gray-200 hover:text-purple-300 transition-colors"
                                        >
                                            support@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;