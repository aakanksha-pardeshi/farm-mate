export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Us</h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-200">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            FarmMate was created to bridge the gap between landowners and farmers, fostering 
            sustainable agricultural partnerships. We believe that by connecting those who have 
            land with those who have the expertise and passion to cultivate it, we can create 
            a more productive and sustainable agricultural ecosystem.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What We Do</h2>
          <p className="leading-relaxed mb-4">
            FarmMate provides a platform where:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Landowners can list their available land and specify what kind of farmer they're looking for</li>
            <li>Farmers can create profiles showcasing their experience and expertise</li>
            <li>Both parties can browse available opportunities and connect with potential partners</li>
            <li>Agricultural partnerships are formed based on mutual needs and compatibility</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h2>
          <p className="leading-relaxed">
            We envision a future where every piece of agricultural land is put to productive use, 
            and every farmer has access to the land they need to grow and thrive. Through technology 
            and community, we're making it easier than ever to form meaningful agricultural partnerships.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Join Us</h2>
          <p className="leading-relaxed">
            Whether you're a landowner looking for the right farmer or a farmer seeking the perfect 
            piece of land, FarmMate is here to help you find your match. Join our growing community 
            today and take the first step toward a successful agricultural partnership.
          </p>
        </section>
      </div>
    </div>
  )
}

