import React from "react";
import styles from "../../css/checkout.less";
import { List, Button } from "antd";
import contactStyles from "../../css/contact.less";
import layoutStyles from "../../css/layout.less";
import gegevens from "Utilities/gegevens";

const data = [
  {
    title: "’t Bakhuus ’t Akkertje",
    href: "https://www.bakhuusakkertje.nl/",
    description: "Veldlaan 4, 6658 KG Beneden-Leeuwen, T 0487 591 372",
  },
  {
    title: "’t Bakhuus Deventer",
    href: "https://www.bakhuusdeventer.nl/",
    description: "Dreef 140E, 7414 EJ Deventer, T 0570 784 289",
  },
  {
    title: "’t Bakhuus Duiven",
    href: "http://www.bakhuusduiven.nl/",
    description: "Rijksweg 42A,6921 AH Duiven, T 0316 253 275",
  },
  {
    title: "’t Bakhuus Ede",
    href: "https://www.bakhuusparkweide.nl/",
    description: "Parkweide 26,6718 DJ Ede, T 0318 844 114",
  },
  {
    title: "’t Bakhuus Enschede",
    href: "http://www.bakhuus.nl/enschede/",
    description: "Wesseler-Nering 21 F,7544 JB Enschede, T 053 574 6615",
  },
  {
    title: "’t Bakhuus Hengelo",
    href: "http://www.bakhuus.nl/hengelo/",
    description: "Spalstraat 5, 7255 AA Hengelo, T 0575 461 212",
  },
  {
    title: "’t Bakhuus Hoevelaken",
    href: "http://www.bakhuus.nl/hoevelaken/",
    description: "Westerdorpsstraat 22, 3871 AX Hoevelaken, T 033 253 6797",
  },
  {
    title: "’t Bakhuus Huissen",
    href: "http://www.bakhuushuissen.nl/",
    description: "Brink 1, 6852 EE Huissen, T 026 325 3164",
  },
  {
    title: "’t Bakhuus Leesten",
    href: "http://www.bakhuus.nl/leesten/",
    description: "Rudolf Steinerlaan 123, 7207 PV Zutphen , T 0575 575 151",
  },
  {
    title: "’t Bakhuus Olst",
    href: "http://www.bakhuusolst.nl",
    description: "Aaldert Geertsstraat 42, 8121 BL Olst, T 0570 562 829",
  },
];

function Vestigingen() {
  return (
    <div>
      <div id="vestigingen" className={styles.fullTitle}>
        <span className={styles.bestelling}>Onze &</span>
        Vestigingen
      </div>
      <div className={layoutStyles.fullSpecials}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="item" href={item.href}>
                  <Button type="primary">Ga naar site</Button>
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
        ,
      </div>
    </div>
  );
}

export default Vestigingen;
