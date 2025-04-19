import React from "react";
import PageHeader from "../components/common/pageHeader";

function About() {
  return (
    <div className="container flex-fill py-4 my-5">
      <PageHeader
        title="About Our Business Card App"
        description="Your one-stop solution for managing and sharing digital business cards."
      />

      <div className="row mt-4">
        <div className="col-12">
          <h2>Welcome!</h2>
          <p>
            This platform allows you to easily create, view, manage, and share
            digital business cards. Whether you're a professional looking to
            expand your network or just want a simple way to keep track of
            contacts, we've got you covered.
          </p>

          <h3 className="mt-4">How to Use This Site:</h3>

          <h4>Browsing Cards:</h4>
          <ul>
            <li>
              <strong>Home Page:</strong> See a gallery of all available
              business cards.
            </li>
            <li>
              <strong>My Cards:</strong> If you are logged in as a business
              user, this section shows only the cards you have created.
            </li>
            <li>
              <strong>Favorite Cards:</strong> View cards you've marked as
              favorites for quick access.
            </li>
          </ul>

          <h4>Managing Your Cards (Business Users):</h4>
          <ul>
            <li>
              <strong>Create a Card:</strong> Navigate to the 'Create Card' page
              (often accessible via a '+' icon or link in the navigation) and
              fill in the details like title, description, contact info, and
              image URL.
            </li>
            <li>
              <strong>Edit a Card:</strong> Go to 'My Cards', find the card you
              wish to modify, and click the edit icon (usually a pencil). This
              will open a form pre-filled with the card's current information.
              Make your changes and save.
            </li>
            <li>
              <strong>Delete a Card:</strong> In 'My Cards', locate the card you
              want to remove and click the delete icon (usually a trash can).
              You'll be asked to confirm before the card is permanently deleted.
            </li>
            <li>
              <strong>Like/Unlike Cards:</strong> Click the heart icon on any
              card (yours or others') to add it to your 'Favorite Cards'. Click
              the heart again to remove it.
            </li>
          </ul>

          <h4>User Accounts:</h4>
          <ul>
            <li>
              <strong>Sign Up:</strong> Create a new account to start creating
              and managing your own cards. You can choose to sign up as a
              'Business' user to access card creation features.
            </li>
            <li>
              <strong>Login:</strong> Access your existing account to manage
              your cards and favorites.
            </li>
          </ul>

          <p className="mt-4">
            We hope you find this platform useful. If you have any questions or
            feedback, please don't hesitate to reach out!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
