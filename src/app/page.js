'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { CheckCircle, Globe, Search, PenTool, TrendingUp, Star, ArrowRight, Phone, Mail, MapPin, Loader2, Sparkles, Zap, Target, BarChart3, Users, Award, ChevronDown } from 'lucide-react';
import { mockData } from './data/mock';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { MdLocationOn } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Home() {


  const recaptchaRef = useRef();
  const [captchaToken, setCaptchaToken] = useState("");

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    currentWebsite: '',
    businessType: '',
    budget: '',
    decisionMaker: '',
    timeline: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (submitMessage) {
      setSubmitMessage('');
      setSubmitStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('');
    const datetime = new Date().toISOString();

    //   if (!captchaToken) {
    //   alert("Please verify the captcha first!");
    //   return;
    // }

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        current_website: formData.currentWebsite,
        business_type: formData.businessType,
        budget: formData.budget,
        decision_maker: formData.decisionMaker,
        timeline: formData.timeline,
        additional_info: formData.additionalInfo || null,
        datetime: datetime
      };

      const response = await axios.post('https://callenttech.adluminious.com/leads.php', submitData,{
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.status === 201) {
        setSubmitStatus('success');
        setSubmitMessage('🎉 Amazing! Your consultation request has been submitted. Our AI-powered web strategy team will analyze your needs and contact you within 24 hours with a custom growth plan.');
        
        console.log("Form submitted successfully:");
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          currentWebsite: '',
          businessType: '',
          budget: '',
          decisionMaker: '',
          timeline: '',
          additionalInfo: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      if (error.response?.data?.detail) {
        setSubmitMessage(`Error: ${error.response.data.detail}`);
      } else if (error.response?.status === 422) {
        setSubmitMessage('Please check your form inputs and try again.');
      } else {
        setSubmitMessage('Something went wrong. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

 const section1Ref = useRef(null);

  const scrollToRef = (ref) => {
     if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log("Reaching")
  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div> */}
              <img src="/logo.png" alt="eMerchandising Logo" className="h-20 w-auto hidden sm:block" />
              {/* <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                eMerchandising Agency
              </span> */}
            </div>
            <nav className="hidden md:flex space-x-8">
              {['About', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-black hover:text-blue-950 transition-colors duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300" onClick={() => scrollToRef(section1Ref)}>
              <Phone className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-white text-4xl font-black">Is Your Website &nbsp;
            <span className="bg-gradient-to-t bg-clip-text text-transparent from-blue-500 via-indigo-600 to-blue-800 mb-8 leading-tight animate-gradient-y">
              Costing You Clients?
            </span>
            </h2>
          <ul className="mt-4 space-y-2 mylist">
            <li className="text-white">❌ Outdated design drives visitors away</li>
            <li className="text-white">❌ Poor SEO = no visibility on Google</li>
            <li className="text-white">❌ Weak copy = low conversions</li>
          </ul>
        </div>
        <div className="max-w-7xl mx-auto text-center">
           <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-pulse-slow">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              AI-Powered Web Design • Conversion-Optimized • Results Guaranteed
            </div>
          <div className="animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-b bg-clip-text text-transparent from-blue-500 via-indigo-600 to-blue-800 mb-8 leading-tight animate-gradient-x">
              Turn Your Website Into a&nbsp;
            <span className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">
             Client-Generating Machine
            </span>
            </h1>
            {/* <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              Elevate Your&nbsp;
              <span className=" bg-gradient-to-r  from-blue-500 via-indigo-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                Websites
              </span>
               <span className="block text-3xl md:text-4xl font-light">Into Revenue</span>
            </h2> */}
            
           
            <p className="text-xl md:text-2xl text-white/80 mb-2 max-w-4xl mx-auto leading-relaxed">
             Websites that convert visitors into customers with built-in <br/>SEO & persuasive copywriting.
            </p>
            <p className="text-white/80 py-4"><strong>Affordable & Scalable </strong><br/>
Projects start from just £500, with solutions tailored for SMEs and growing e-commerce brands.</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-6 text-lg font-medium shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 group" onClick={() => scrollToRef(section1Ref)}>
                <Target className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300"  />
               Get My Free Website Audit Worth £299
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              {/* <div className="text-white/70 text-center">
                <p className="text-sm font-medium">Premium Investment</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">£2,500 - £15,000</p>
                <p className="text-xs">ROI-focused pricing</p>
              </div> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: TrendingUp, value: '234%', label: 'Avg. Conversion Increase' },
                { icon: Users, value: '500+', label: 'Businesses Transformed' },
                { icon: Award, value: '98%', label: 'Client Satisfaction' },
                { icon: BarChart3, value: '£2.4M+', label: 'Revenue Generated' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div> */}
      </section>

      {/* Services Section */}
      <section id="about" className="relative z-30 py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Signature Solutions
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What Makes Us
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine AI-powered analytics, conversion psychology, and award-winning design to create digital experiences that drive real business growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {mockData.services.map((service, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 bg-white/70 backdrop-blur-sm group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 text-center mb-8 text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center group/item">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-20 py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Client Success Stories
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Real Results,
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Real Impact
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See how we&apos;ve transformed businesses across industries with our data-driven approach and cutting-edge design.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-8 italic text-lg leading-relaxed">&apos;{testimonial.quote}&apos;</p>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">{testimonial.name}</p>
                      <p className="text-white/70">{testimonial.position}</p>
                      {/* <p className="text-blue-400 font-medium">{testimonial.company}</p> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="relative z-10 pt-16 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Free Strategy Session
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to Transform
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Business?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" id="leadform">
              Get a personalized growth strategy session. We&apos;ll analyze your current digital presence and show you exactly how to increase conversions by 200%+.
            </p>
          </div>
          
          <Card className="shadow-3xl border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden" ref={section1Ref} id="section-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <CardContent className="p-12 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-800 font-medium text-lg">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 bg-white/50"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-800 font-medium text-lg">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 bg-white/50"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-800 font-medium text-lg">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 bg-white/50"
                      placeholder="+44 20 XXXX XXXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-800 font-medium text-lg">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 bg-white/50"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-800 font-medium text-lg">Ready to create or upgrade your website? *</Label>
                  <Select onValueChange={(value) => handleInputChange('currentWebsite', value)}>
                    <SelectTrigger className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white/50">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I am ready to invest</SelectItem>
                      <SelectItem value="no">No, just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-800 font-medium text-lg">What type of business do you operate? *</Label>
                  <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white/50">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional Services (Consultants, Lawyers, Accountants)</SelectItem>
                      <SelectItem value="ecommerce">E-commerce & Online Retail</SelectItem>
                      <SelectItem value="other">Other Industry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-800 font-medium text-lg">Investment budget for this project? *</Label>
                  <Select onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white/50">
                      <SelectValue placeholder="Select your investment range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1000">Under £2,500 (Basic)</SelectItem>
                      <SelectItem value="1000-5000">£2,500 - £7,500 (Professional)</SelectItem>
                      <SelectItem value="5000-10000">£7,500 - £15,000 (Premium)</SelectItem>
                      <SelectItem value="over-10000">£15,000+ (Enterprise)</SelectItem>
                      <SelectItem value="not-determined">Let&apos;s discuss options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="decisionMaker" className="text-gray-800 font-medium text-lg">Who makes the final decision? (Name & Role) *</Label>
                  <Input
                    id="decisionMaker"
                    value={formData.decisionMaker}
                    onChange={(e) => handleInputChange('decisionMaker', e.target.value)}
                    placeholder="e.g., Sarah Johnson - CEO & Founder"
                    className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 bg-white/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-800 font-medium text-lg">When do you want to launch? *</Label>
                  <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="mt-2 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 bg-white/50">
                      <SelectValue placeholder="Select your timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">ASAP - This is urgent</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="4-6-months">4-6 months</SelectItem>
                      <SelectItem value="7-12-months">7-12 months</SelectItem>
                      <SelectItem value="no-timeline">No specific timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-gray-800 font-medium text-lg">Tell us about your goals</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="What are your main business goals? Current challenges? Dream outcomes?"
                    className="mt-2 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 bg-white/50"
                    rows={4}
                  />
                </div>

                {submitMessage && (
                  <div className={`p-6 rounded-xl ${submitStatus === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'} text-lg`}>
                    {submitMessage}
                  </div>
                )}

<p>Callenttech Media needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.</p>
           {/* ✅ reCAPTCHA */}
      
                <div className="flex justify-center items-center flex-col text-center pt-8">
                    
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LcwKsArAAAAAB3YYR7TKgBKEmal19UDL2-xBjQl"
        onChange={(token) => setCaptchaToken(token)}
        className="mb-6"
      />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-16 py-6 text-xl font-medium shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 group"
                    // disabled={!captchaToken}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Analyzing Your Needs...
                      </>
                    ) : (
                      <>

                        {/* <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" /> */}
                        Submit
                        {/* <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" /> */}
                      </>
                    )}
                  </Button>
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 text-lg font-medium">
                      ⚡ Instant Response • 🎯 Custom Strategy • 💰 ROI Guaranteed
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Our senior strategist will contact you within 24 hours
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>


<div className="flex z-20 pt-12 bg-gradient-to-br text-white text-center justify-center items-center">
  <h2 className="text-center text-2xl ">
    Trusted by Businesses Across UK & EU
  </h2>
  <br/>
</div>
<div className="flex z-20 bg-gradient-to-br pb-12 text-white text-center justify-center items-center">

   {[...Array(5)].map((_, i) => (
     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" /> 
    ))}
    <br/>
    <h4 className="block">
     &nbsp;Rated | Google Partner | Shopify Partner 
    </h4>
    <br/>
    </div>

{/* <div className="flex pb-6 z-20 bg-gradient-to-br text-center justify-center items-center from-white via-blue-50 to-purple-50">
    </div> */}





      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  eMerchandising Agency
                </span> */}
              <img src="/logo.png" alt="eMerchandising Logo" className="h-20 w-auto hidden sm:block bg-white" />

              </div>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
               At Callent Tech Ltd, we believe in the power of innovation and the magic of creativity. Our mission is simple: to help businesses thrive in the digital age through tailored marketing strategies that deliver measurable results.
              </p>
              {/* <div className="flex space-x-6">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
              </div> */}
            </div>
            <div>
              <h3 className="font-bold mb-6 text-xl">Services</h3>
              <ul className="space-y-3 text-white/70">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/data-solutions/">Data Solution</a></li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/email-marketing/">Email Marketing</a></li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/tele-marketing/">Tele Marketing</a></li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/digital-marketing/">Digital Marketing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-xl">Links</h3>
              <ul className="space-y-3 text-white/70">
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/">Home</a></li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/about-us/">About</a></li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/about-us/">Why Choose Callent?</a></li>
                <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                  <a href="https://callenttech.com/privacy-policy/">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-xl">Information</h3>
              <p className="text-yellow-400">United Kingdom</p>
              <ul className="footerlist">
                
              </ul>
              <ul className="footerlist">
                <li className="inline-flex">
                    <span className="text-2xl">
                    <MdLocationOn />
                  </span>
                  <span>
                  128 City Road,
                  London EC1V 2NX
                  </span>
                </li>
                <li>
                  <span className="text-2xl">
                    <FaPhoneAlt />
                  </span>
                  <span>&nbsp;+44 20 8163 4878</span>
                </li>
              </ul>


              <p className="mt-4 text-yellow-400">United States of America</p>
              <ul className="footerlist">
                <li className="inline-flex">
                    <span className="text-2xl">
                    <MdLocationOn />
                  </span>
                  <span>
                  8 The Green, Suite R,
Kent, Dover, Delaware 19901
                  </span>
                </li>
                <li>
                  <span className="text-2xl">
                    <FaPhoneAlt />
                  </span>
                  <span>&nbsp;+1 315 215 0225</span>
                </li>

                <li className="inline-flex mt-6">
                    <span className="text-2xl">
                    <MdOutlineEmail />
                  </span>
                  <span>&nbsp;
                  contactus@callenttech.com
                  </span>
                </li>
               
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-16 pt-8 text-center">
            <p className="text-white/60">
              &copy; 2024 eMerchandising Agency Limited. All rights reserved. | 
              <span className="text-blue-400 ml-2">Engineered for results, designed for success.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>

  );
}
