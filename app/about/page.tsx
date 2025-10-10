import { Award, Heart, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Ticket</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner in discovering and booking unforgettable event experiences
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At Ticket, we believe that everyone deserves access to amazing experiences.
              Our mission is to connect people with the events they love, making ticket
              purchasing simple, secure, and accessible for everyone.
            </p>
            <p className="text-lg text-gray-600">
              Whether you&apos;re looking for concerts, sports events, theater performances,
              or comedy shows, we&apos;re here to help you find and book the perfect experience.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Users className="w-24 h-24 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Security</h3>
              <p className="text-gray-600">
                Your data and transactions are protected with industry-leading security measures.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                We&apos;re passionate about connecting people with experiences they&apos;ll never forget.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We foster a vibrant community of event lovers and organizers.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service and support.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ticket by the Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10M+</div>
              <div className="text-blue-100">Tickets Sold</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Events Listed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5M+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We&apos;re a diverse team of event enthusiasts, tech experts, and customer service
            professionals dedicated to making your experience exceptional.
          </p>
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">
              Our team is working hard behind the scenes to bring you the best ticketing experience possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}