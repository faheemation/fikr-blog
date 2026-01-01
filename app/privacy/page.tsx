import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-black pt-16">
                {/* Hero */}
                <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
                    <div className="container-custom max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-12 h-12" />
                            <h1 className="text-5xl md:text-6xl font-serif font-bold">
                                Privacy Policy
                            </h1>
                        </div>
                        <p className="text-xl text-white/80">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 bg-white">
                    <div className="container-custom max-w-4xl prose prose-lg">
                        <h2>Introduction</h2>
                        <p>
                            Welcome to Fikr By Sio Varam ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                        </p>

                        <h2>Information We Collect</h2>
                        <h3>Personal Information</h3>
                        <p>We may collect personal information that you voluntarily provide to us when you:</p>
                        <ul>
                            <li>Register for an account</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Post comments on our blog</li>
                            <li>Contact us directly</li>
                        </ul>
                        <p>This information may include:</p>
                        <ul>
                            <li>Name and email address</li>
                            <li>Profile information and avatar</li>
                            <li>Comments and user-generated content</li>
                        </ul>

                        <h3>Automatically Collected Information</h3>
                        <p>When you visit our website, we automatically collect certain information about your device, including:</p>
                        <ul>
                            <li>IP address and browser type</li>
                            <li>Operating system and device information</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Referring website addresses</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve and personalize your experience</li>
                            <li>Send you newsletters and updates (with your consent)</li>
                            <li>Respond to your comments and questions</li>
                            <li>Analyze usage patterns and improve our content</li>
                            <li>Detect and prevent fraud or abuse</li>
                        </ul>

                        <h2>Data Storage and Security</h2>
                        <p>
                            We use Supabase for secure data storage and authentication. Your data is encrypted in transit and at rest. We implement appropriate technical and organizational security measures to protect your personal information.
                        </p>

                        <h2>Third-Party Services</h2>
                        <p>We use the following third-party services:</p>
                        <ul>
                            <li><strong>Supabase:</strong> Database and authentication</li>
                            <li><strong>Cloudinary:</strong> Image hosting and optimization</li>
                            <li><strong>Vercel:</strong> Website hosting</li>
                        </ul>
                        <p>These services have their own privacy policies governing the use of your information.</p>

                        <h2>Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>

                        <h2>Your Privacy Rights</h2>
                        <p>Depending on your location, you may have the following rights:</p>
                        <ul>
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your personal information</li>
                            <li>Object to processing of your personal information</li>
                            <li>Request restriction of processing</li>
                            <li>Data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>

                        <h2>Children's Privacy</h2>
                        <p>
                            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                        </p>

                        <h2>Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at:
                        </p>
                        <p>
                            Email: <a href="mailto:privacy@fikr.blog">privacy@fikr.blog</a>
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
