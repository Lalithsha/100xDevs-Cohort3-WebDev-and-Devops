import { useState } from "react";
import { Button } from "../components/ui/Button";
import Card from "../components/ui/Card";
import CreateContentModal from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/Share";
import Sidebar from "../components/ui/Sidebar";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div>
      <Sidebar />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-end gap-4">
          <Button
            startIcon={<PlusIcon size="lg" />}
            variant="secondary"
            text="Add Content"
            size="lg"
            onClick={() => setModalOpen(true)}
          ></Button>
          <Button
            startIcon={<ShareIcon size="md" />}
            variant="primary"
            text="Share Brain"
            size="md"
            onClick={handleButtonClick}
          ></Button>
        </div>

        <div className="flex gap-8">
          <Card
            title="My tweet"
            type="twitter"
            link="https://x.com/LalithS37236456/status/1866922681259659340?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1866922681259659340%7Ctwgr%5E533049dcbcffe0caa1d5139ddd7203e01bc62c9b%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Furl%3Dhttps%3A%2F%2Ftwitter.com%2FLalithS37236456%2Fstatus%2F1866922681259659340"
          />

          <Card
            title="100xDevs"
            type="youtube"
            link="https://www.youtube.com/watch?v=IsM4bnJ-8Gw"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
