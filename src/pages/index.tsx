import type { NextPage } from "next";
import AlbumList from "./albums";
import Current from "./current";

const Home: NextPage = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1">
      <div className="border p-5">
        <div className="text-xl">
          Album-a-Day will give you a new album to listen to every day that you
          open the site. You can add a new album to the site using your spotify
          account.
        </div>

        <div className="pt-10 text-xl">
          To add an album, go to{" "}
          <a href="/add" className="hover:underline">
            Add an Album
          </a>
          .
        </div>

        <div className="pt-10 text-xl">Ideas to Add:</div>
        <ul className="list-disc pl-3">
          <li>User Accounts can have their own separate list of albums</li>
          <li>Ability for Users to rate albums that they listen to</li>
          <li>Filters in the list of Albums</li>
          <li>Ability for people without Spotify to create an account</li>
        </ul>
      </div>
      <div className="border p-2 text-3xl">
        Today's Album:
        <Current />
      </div>
      <div className="border p-2">
        <div className="text-3xl">Recently Listened:</div>
        <AlbumList />
      </div>
    </div>
  );
};

export default Home;
