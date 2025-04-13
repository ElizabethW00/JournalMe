import React from "react";

const About = () => {
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="w-full lg:w-1/2">
          <section className="mb-8">
            <h2 className="text-5xl font-bold mb-4 bad-script">
              About JournalMe
            </h2>
            <p className="text-lg leading-relaxed">
              JournalMe is a platform designed for focused, distraction-free
              journaling. Whether you're reflecting on your day or tracking your
              personal growth, JournalMe helps you concentrate on your thoughts
              and revisit past entries effortlessly. If you enjoy writing and
              seeing your journey unfold, JournalMe is made for you.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-4">Create an Account</h2>
            <div className="space-y-2 text-lg">
              <p className="font-semibold">Don’t have an account?</p>
              <p>Click the “Begin” button in the center of the home page.</p>

              <p className="font-semibold">Want to log in?</p>
              <p>Click the “Sign In” button on the navigation bar.</p>

              <p className="font-semibold">Want to sign out?</p>
              <p>Click your profile icon to sign out.</p>
            </div>
          </section>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="journal.png"
            alt="JournalMe Preview"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
      <section className="py-10">
        <h2 className="text-3xl font-bold mb-4">Let’s Begin!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 text-center">
          {/* Step 1 */}
          <div>
            <p className="text-lg font-medium mb-4">
              1. To start, click on the “Write” tab and start writing your entry
            </p>
            <img
              src="writeTab.png"
              alt="Write Entry"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>

          {/* Step 2 */}
          <div>
            <p className="text-lg font-medium mb-4">
              2. Once finished, save your entry with “Save & Exit” button
            </p>
            <img
              src="saveAndExit.png"
              alt="Save and Exit"
              className="h-19 rounded-lg shadow-lg mx-auto"
            />
          </div>

          {/* Step 3 */}
          <div>
            <p className="text-lg font-medium mb-4">
              3. View your entries in a list view in the “Journals” tab
            </p>
            <img
              src="journalList.png"
              alt="Journals List View"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>

          {/* Step 4 */}
          <div>
            <p className="text-lg font-medium mb-4">
              4. Check out your entries in a calendar view to see your daily
              progress!
            </p>
            <img
              src="calendarView.png"
              alt="Calendar View"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
