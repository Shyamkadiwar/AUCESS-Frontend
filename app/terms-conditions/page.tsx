import React from 'react';
import { Users, CreditCard, Shield, Gavel, AlertTriangle, Phone, Mail, Globe, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import mainLogo from "@/public/mainLogo.png"

const TermsConditionsPage = () => {
    const lastUpdated = "January 2025";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Back button */}
                        <div className="flex items-center gap-4">
                            <a
                                href="/signup"
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Sign Up
                            </a>
                        </div>

                        {/* Logo section with added spacing */}
                        <div className="flex items-center gap-3 py-2">
                            <Image
                                src={mainLogo}
                                alt="logo"
                                height={60}
                                width={50}
                                style={{ height: "60px", width: "50px" }}
                            />
                            <h1 className="font-neue-bold text-black md:text-2xl">AUCESS</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Please read these terms carefully before using our educational services. By using Aucess, you agree to these terms.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Last updated: <span className="font-medium">{lastUpdated}</span>
                    </p>
                </div>

                {/* Content Sections */}
                <div className="bg-white rounded-lg shadow-sm border p-8 space-y-10">

                    {/* Section 1: Acceptance of Terms */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Gavel className="w-4 h-4 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed">
                                By registering for, accessing, or using our services, you acknowledge that you have read, understood,
                                and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not
                                agree to these terms, you may not access or use our services.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Description of Services */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Globe className="w-4 h-4 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">2. Description of Services</h2>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Aucess Technology Private Limited provides education-related services, which may include online courses,
                            tutoring, educational resources, and learning platforms. The specific features and functionalities of our
                            services may vary from time to time.
                        </p>
                    </section>

                    {/* Section 3: User Accounts */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">3. User Accounts</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="pl-6 border-l-2 border-gray-200">
                                <ul className="space-y-3 text-gray-700">
                                    <li>• To access certain features of our services, you may be required to create a user account.</li>
                                    <li>• You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                                    <li>• You agree to provide accurate, current, and complete information during registration.</li>
                                    <li>• You must notify us immediately of any unauthorized access to or use of your account.</li>
                                    <li>• We reserve the right to suspend or terminate your account at our sole discretion for violations of these terms.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: User Conduct */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">4. User Conduct</h2>
                        </div>
                        <p className="text-gray-700 mb-4">By using our services, you agree not to:</p>
                        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                            <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                                <li>• Use our services for any unlawful purpose</li>
                                <li>• Disrupt or damage our services or networks</li>
                                <li>• Attempt unauthorized access to our systems</li>
                                <li>• Transmit viruses or malicious code</li>
                                <li>• Collect user information without consent</li>
                                <li>• Impersonate any person or entity</li>
                                <li>• Post harmful or offensive content</li>
                                <li>• Infringe intellectual property rights</li>
                                <li>• Use services for commercial purposes without consent</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Intellectual Property */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">5. Intellectual Property</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                                All content and materials provided through our services, including but not limited to text, graphics,
                                logos, images, videos, software, and the design and layout of our platform, are owned by or licensed
                                to Aucess Technology Private Limited and are protected by copyright, trademark, and other intellectual
                                property laws.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use
                                our services and the content therein solely for your personal, educational, and non-commercial use,
                                in accordance with these Terms and Conditions.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Payment and Fees */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-yellow-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">6. Payment and Fees</h2>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                            <ul className="space-y-2 text-gray-700">
                                <li>• If our services require payment, you agree to pay all applicable fees as described on our platform.</li>
                                <li>• We may change our fees at any time with reasonable notice.</li>
                                <li>• All payments are non-refundable unless otherwise stated in our refund policy.</li>
                                <li>• You are responsible for providing accurate and up-to-date payment information.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 7: Third-Party Links */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links and Content</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our services may contain links to third-party websites or resources. We are not responsible for the
                            content, products, or services offered by such third parties. Your use of third-party websites and
                            resources is at your own risk and is subject to the terms and conditions and privacy policies of those
                            third parties.
                        </p>
                    </section>

                    {/* Section 8: Disclaimer */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
                        <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg">
                            <p className="text-gray-700 text-sm leading-relaxed uppercase tracking-wide">
                                OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND,
                                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR
                                A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR
                                USAGE OF TRADE.
                            </p>
                        </div>
                    </section>

                    {/* Section 9: Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
                        <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg">
                            <p className="text-gray-700 text-sm leading-relaxed uppercase tracking-wide">
                                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL AUCESS TECHNOLOGY PRIVATE LIMITED
                                BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR
                                RELATING TO YOUR USE OF OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US
                                IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
                            </p>
                        </div>
                    </section>

                    {/* Section 10: Indemnification */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
                        <p className="text-gray-700 leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Aucess Technology Private Limited, its affiliates,
                            officers, directors, employees, agents, and licensors from and against any and all claims, liabilities,
                            damages, losses, costs, expenses, or fees arising out of or relating to your breach of these Terms and
                            Conditions or your use of our services.
                        </p>
                    </section>

                    {/* Section 11: Governing Law */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law and Dispute Resolution</h2>
                        <p className="text-gray-700 leading-relaxed">
                            These Terms and Conditions shall be governed by and construed in accordance with the laws of India,
                            without regard to its conflict of law principles. Any dispute arising out of or relating to these
                            Terms and Conditions shall be subject to the exclusive jurisdiction of the courts in India.
                        </p>
                    </section>

                    {/* Section 12: Modifications */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify these Terms and Conditions at any time without prior notice. Any changes
                            will be effective immediately upon posting the revised Terms and Conditions on our platform. Your
                            continued use of our services after the posting of the revised terms constitutes your acceptance of the changes.
                        </p>
                    </section>

                    {/* Section 13: Termination */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Termination</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may terminate your access to and use of our services at any time, with or without cause, and without
                            prior notice. Upon termination, your right to use our services will immediately cease. All provisions
                            of these Terms and Conditions that by their nature should survive termination shall survive termination.
                        </p>
                    </section>

                    {/* Contact Section */}
                    <section className="border-t pt-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">15. Contact Us</h2>
                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                            <p className="text-gray-700 mb-4">
                                If you have any questions or concerns about these Terms and Conditions, please contact us at:
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium text-gray-900">AUCESS TECHNOLOGY PRIVATE LIMITED</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">support@aucess.in</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700">9023066078</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 mt-8">
                    <p>© 2025 Aucess Technology Private Limited. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsConditionsPage;