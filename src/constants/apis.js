import { apis as rawApis } from "@scrape-creators/api-config";
import { withIcons } from "@scrape-creators/api-config/withIcons";
import ScrapeCreatorsIcon from "../components/ScrapeCreatorsIcon";
import { TruthSocialIcon } from "../TruthSocialIcon.jsx";
import { KomiIcon } from "../KomiIcon.jsx";
import { PillarIcon } from "../PillarIcon.jsx";
import { LinkBioIcon } from "../LinkBioIcon.jsx";
import { LinkmeIcon } from "../LinkmeIcon.jsx";

export const apis = withIcons(rawApis, {
  truthsocial: TruthSocialIcon,
  komi: KomiIcon,
  pillar: PillarIcon,
  linkbio: LinkBioIcon,
  "scrape-creators": ScrapeCreatorsIcon,
  linkme: LinkmeIcon,
});
