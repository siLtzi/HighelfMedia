export type ServiceSlug =
  | "yrityskuvaus"
  | "haakuvaus"
  | "muotokuvaus"
  | "lapsi-ja-perhekuvaus"
  | "rippi-ja-valmistujaiskuvaus"
  | "asuntokuvaus"
  | "hautajaiskuvaus"
  | "elainkuvaus";

export type ServicePageConfig = {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  info: string;
  pricingIntro: string;
  portfolioIntro: string;
  heroImage: string;
  heroImageAlt: string;
  howItWorks: {
    title: string;
    desc: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
  portfolioImages: string[];
};

export const SERVICE_PAGES: ServicePageConfig[] = [
  // ============================
  //  YRITYSKUVAUS
  // ============================
  {
    slug: "yrityskuvaus",
    title: "Yrityskuvaus",
    tagline:
      "Yrityksesi näköiset kuvat verkkosivuille, someen ja markkinointiin.",
    info: "Yrityskuvauksessa keskityn siihen, että yrityksesi näyttää ammattimaiselta, luotettavalta ja helposti lähestyttävältä. Kuvaan henkilöstöä, tiloja, tuotteita ja arjen tekemistä – asioita, jotka kertovat, kuka te olette ja mitä teette. Kuvaus tehdään rennosti ja suunnitelmallisesti, jotta kuvaushetki ei häiritse turhaan työpäivää.",
    pricingIntro:
      "Yrityskuvauksessa hinta muodostuu kuvausajasta, kohteiden määrästä (esim. toimisto + tuotantotila) ja valmiiden kuvien määrästä. Hinnastosta saat selkeän pohjan, ja tarvittaessa teen erillisen tarjouksen isommista kokonaisuuksista.",
    portfolioIntro:
      "Alla muutamia esimerkkikuvia yritysasiakkailta – henkilöstö-, brändi- ja tilakuvia eri toimialoilta.",
    heroImage: "/services/yrityskuvaus-hero.jpg",
    heroImageAlt: "Yrityksen tiimi nauramassa rennossa ryhmäkuvassa toimistolla.",
    howItWorks: [
      {
        title: "1. Yhteydenotto",
        desc: "Kerro minulle lyhyesti yrityksestäsi, kuvaustarpeesta ja toivotusta ajankohdasta. Vastaan yleensä saman päivän aikana."
      },
      {
        title: "2. Suunnittelu",
        desc: "Sovimme, mitä kuvataan (henkilöstö, tilat, tuotteet, brändikuvat), missä ja kuinka laajasti. Käymme läpi myös tyyli- ja värimaailman."
      },
      {
        title: "3. Kuvauspäivä",
        desc: "Saavun paikalle sovittuna aikana ja ohjaan tarvittaessa poseeraukset. Tavoitteena on mahdollisimman kevyt häiriö arjen työpäivään."
      },
      {
        title: "4. Valinta ja toimitus",
        desc: "Saat vedosgallerian, josta valitaan lopulliset kuvat. Valmiit, editoidut kuvat toimitetaan digitaalisina käyttöoikeuksien kanssa."
      }
    ],
    faq: [
      {
        q: "Mitä henkilöstön kannattaa pukea päälle?",
        a: "Yleensä suosittelen selkeitä, yksivärisiä vaatteita, joissa ei ole suuria logoja tai räikeitä kuoseja. Autan mielelläni tyylin suunnittelussa etukäteen."
      },
      {
        q: "Voimmeko kuvata useassa eri paikassa samana päivänä?",
        a: "Kyllä, usein yrityskuvauksissa yhdistetään toimisto, tuotantotilat ja mahdollinen ulkomiljöö. Tämä huomioidaan tarjouksessa ja kuvausajassa."
      },
      {
        q: "Millaiset käyttöoikeudet kuvilla on?",
        a: "Yrityskuvien hinnoittelu sisältää normaalisti laajat käyttöoikeudet yrityksen omaan markkinointiin, verkkosivuille ja someen. Erikoistapauksissa voimme sopia tarkemmin kirjallisesti."
      }
    ],
    portfolioImages: [
      "/portfolio/yrityskuvaus-1.jpg",
      "/portfolio/yrityskuvaus-2.jpg",
      "/portfolio/yrityskuvaus-3.jpg",
      "/portfolio/yrityskuvaus-4.jpg",
      "/portfolio/yrityskuvaus-5.jpg",
      "/portfolio/yrityskuvaus-6.jpg"
    ]
  },

  // ============================
  //  HÄÄKUVAUS
  // ============================
  {
    slug: "haakuvaus",
    title: "Hääkuvaus",
    tagline: "Tarinalliset ja aidot kuvat tärkeästä päivästä.",
    info: "Hääkuvauksessa dokumentoin päivänne mahdollisimman luonnollisesti ja huomaamattomasti. Tavoitteeni on tallentaa tunnelma, pienet yksityiskohdat ja hetket, jotka tuntuvat merkityksellisiltä vielä vuosien päästä. Ohjaan tarvittaessa potretteja ja autan löytämään kuvaukselle sopivat paikat ja aikataulun.",
    pricingIntro:
      "Hääkuvauksen hinta muodostuu kuvausajasta, matkasta ja kokonaisuudesta (esim. pelkkä vihkiminen + potretit, tai koko päivä valmisteluista iltaan asti). Hinnastosta näet eri laajuiset pakettivaihtoehdot, ja niiden pohjalta voidaan tehdä tarkka tarjous.",
    portfolioIntro:
      "Tässä muutamia esimerkkikuvia potretteista, vihkimisestä ja juhlan tunnelmasta eri hääpareilta.",
    heroImage: "/services/haakuvaus-hero.jpg",
    heroImageAlt:
      "Hääpari katsoo toisiaan ilta-auringossa ulkona.",
    howItWorks: [
      {
        title: "1. Alkutapaaminen",
        desc: "Joko etäyhteydellä tai kasvotusten käymme läpi päivänne kulun, toiveet ja tärkeimmät hetket kuvauksen kannalta."
      },
      {
        title: "2. Suunnitelma & aikataulu",
        desc: "Laadin selkeän kuvaussuunnitelman ja aikataulun, jotta tiedätte tarkalleen, missä kohtaa olen mukana ja mitä kuvataan."
      },
      {
        title: "3. Hääpäivä",
        desc: "Kuvaan rennosti ja huomaamattomasti. Ohjaan potretit niin, ettei teidän tarvitse miettiä 'mitä seuraavaksi tehdään'."
      },
      {
        title: "4. Vedokset & lopulliset kuvat",
        desc: "Saatte vedosgallerian, josta valitaan lopulliset kuvat. Valmiit kuvat toimitetaan korkearesoluutioisina ja verkkokokoisina tiedostoina."
      }
    ],
    faq: [
      {
        q: "Mitä jos sää on huono?",
        a: "Suunnittelemme aina varavaihtoehdon potrettipaikalle. Huono sää voi olla myös visuaalisesti upea – sade, sumu tai harmaa taivas eivät ole este hyvälle kuvalle."
      },
      {
        q: "Saammeko raakakuvat?",
        a: "Toimitan aina valmiiksi editoidut kuvat, jotka ovat osa kokonaisuutta ja tyyliäni. Raakakuvia en yleensä luovuta, mutta galleria on laaja ja monipuolinen."
      },
      {
        q: "Kuinka nopeasti saamme kuvat?",
        a: "Ensimmäiset maistiaiskuvat toimitan yleensä 1–3 päivän sisällä. Loput valmiit kuvat toimitan tyypillisesti 3–6 viikon kuluessa sesongista riippuen."
      }
    ],
    portfolioImages: [
      "/portfolio/haat-1.jpg",
      "/portfolio/haat-2.jpg",
      "/portfolio/haat-3.jpg",
      "/portfolio/haat-4.jpg",
      "/portfolio/haat-5.jpg",
      "/portfolio/haat-6.jpg"
    ]
  },

  // ============================
  //  MUOTOKUVAUS
  // ============================
  {
    slug: "muotokuvaus",
    title: "Muotokuvaus",
    tagline: "Luonnolliset ja tyylikkäät muotokuvat juuri sinun tyyliisi.",
    info: "Muotokuvaus voi olla rento kuvaus ulkona, urbaanissa ympäristössä tai rauhallinen studiomainen kuvaus sisällä. Autan poseerauksessa ja annan selkeitä ohjeita, jotta sinun ei tarvitse miettiä, mitä tehdä kameran edessä. Tavoitteena on tuoda esiin sinun persoonasi – ei jäykkiä passikuvamaisia potretteja.",
    pricingIntro:
      "Muotokuvauksissa on selkeä perushinta, johon sisältyy tietty määrä valmiiksi editoituja kuvia. Lisäkuvia ja laajempaa editointia on mahdollista ostaa erikseen. Hinnaston avulla näet helposti eri vaihtoehdot.",
    portfolioIntro:
      "Alla esimerkkejä muotokuvauksista – sekä henkilökohtaisia potretteja että ammattikäyttöön (CV, some, portfolio) suunnattuja kuvia.",
    heroImage: "/services/muotokuvaus-hero.jpg",
    heroImageAlt: "Henkilö katsoo kameraan pehmeässä luonnonvalossa.",
    howItWorks: [
      {
        title: "1. Yhteydenotto & toiveet",
        desc: "Kerro mihin tarkoitukseen kuvia tarvitset (esim. some, CV, portfolio), ja millaista tunnelmaa toivot – rentoa, dramaattista, neutraalia."
      },
      {
        title: "2. Sijainti & tyyli",
        desc: "Valitaan yhdessä sopiva kuvauspaikka: ulko-, sisä- tai studiomainen miljöö. Saat halutessasi pukeutumisvinkkejä ja värisuosituksia."
      },
      {
        title: "3. Kuvaushetki",
        desc: "Kuvaus on rento ja ohjattu – annan jatkuvasti neuvoja siitä, minne katsoa ja miten olla. Tarkoitus ei ole jännittää, vaan löytää sinun näköinen tapa olla kameran edessä."
      },
      {
        title: "4. Kuvien valinta",
        desc: "Saat vedosgallerian, josta valitset suosikkisi. Valitut kuvat viimeistellään huolellisesti ennen toimitusta."
      }
    ],
    faq: [
      {
        q: "En ole luonteva kameran edessä, onnistuuko kuvaus silti?",
        a: "Ehdottomasti. Suurin osa asiakkaistani sanoo samaa etukäteen. Kuvaus on ohjattu ja rento, ja omaa epävarmuutta ei näy lopputuloksessa samalla tavalla kuin miltä se tuntuu."
      },
      {
        q: "Voinko vaihtaa asua kuvauksen aikana?",
        a: "Kyllä, se on jopa suositeltavaa jos haluat erilaisia kuvia eri käyttötarkoituksiin. Suunnitellaan yhdessä järkevä määrä asuja kuvausaikaan nähden."
      },
      {
        q: "Saanko kuvat myös mustavalkoisina?",
        a: "Kyllä, monista kuvista toimii erinomaisesti sekä värillinen että mustavalkoinen versio. Voin tehdä molemmat tarvittaessa."
      }
    ],
    portfolioImages: [
      "/portfolio/muotokuvaus-1.jpg",
      "/portfolio/muotokuvaus-2.jpg",
      "/portfolio/muotokuvaus-3.jpg",
      "/portfolio/muotokuvaus-4.jpg",
      "/portfolio/muotokuvaus-5.jpg",
      "/portfolio/muotokuvaus-6.jpg"
    ]
  },

  // ============================
  //  LAPSI- JA PERHEKUVAUS
  // ============================
  {
    slug: "lapsi-ja-perhekuvaus",
    title: "Lapsi- ja perhekuvaus",
    tagline: "Aitoja hetkiä ja ilmeitä – ei väkisin poseerattuja kuvia.",
    info: "Lapsi- ja perhekuvauksessa tärkeintä on tunnelma ja yhdessäolo. Kuvaus tehdään lapsille ja perheelle sopivaan tahtiin – välillä leikitään, välillä istutaan, välillä vaikka juostaan. Parhaat kuvat syntyvät silloin, kun kenenkään ei tarvitse esittää mitään.",
    pricingIntro:
      "Perhekuvaukset hinnoitellaan tyypillisesti paketteina, joissa on tietty kuvausaika ja määrä valmiita kuvia. Lisäkuvia voi tilata tarvittaessa. Hinnastosta näet eri vaihtoehdot esimerkiksi pienelle tai suuremmalle perheelle.",
    portfolioIntro:
      "Esimerkkejä perhe- ja lapsikuvauksista – arjen hetkiä, yhteisiä leikkihetkiä ja rauhallisia sylikuvia.",
    heroImage: "/services/perhekuvaus-hero.jpg",
    heroImageAlt:
      "Perhe istuu yhdessä ulkona ja nauraa, lapset vanhempien sylissä.",
    howItWorks: [
      {
        title: "1. Keskustelu & suunnittelu",
        desc: "Kerro millainen perheenne on ja millaisia kuvia toivotte – rennosti ulkona, kotona, studiomainen vai jotain siltä väliltä."
      },
      {
        title: "2. Kuvauspaikka & ajankohta",
        desc: "Valitaan perheelle mieluisa paikka ja sopiva kellonaika. Esimerkiksi ilta-aurinko toimii usein kauniisti ulkona."
      },
      {
        title: "3. Kuvaushetki",
        desc: "Kuvaus kestää yleensä 45–90 minuuttia. Pidetään taukoja tarvittaessa, annetaan lasten tutustua kameraan ja leikitään yhdessä."
      },
      {
        title: "4. Kuvien valinta & toimitus",
        desc: "Saatte vedosgallerian, josta valitaan perheen suosikit. Valmiit kuvat toimitetaan digitaalisesti ja halutessa myös printteihin sopivina tiedostoina."
      }
    ],
    faq: [
      {
        q: "Entä jos lapsi ei halua olla kuvassa?",
        a: "On täysin normaalia, että lapsi jännittää tai ei heti innostu. Kuvaus tehdään lapsen ehdoilla – usein pieni leikki tai tauko auttaa, ja lopulta kuvat syntyvät kuin itsestään."
      },
      {
        q: "Voimmeko ottaa mukaan isovanhemmat tai lemmikin?",
        a: "Ehdottomasti. Läheiset ja lemmikit ovat iso osa perhettä ja sopivat erinomaisesti mukaan perhekuvaukseen."
      },
      {
        q: "Mitä jos sää on huono ulkokuvauksessa?",
        a: "Jos sää on todella huono, siirrämme kuvauksen tai etsimme vaihtoehtoisen sisätilan. Pienet pilvet tai viileä sää eivät ole ongelma."
      }
    ],
    portfolioImages: [
      "/portfolio/perhe-1.jpg",
      "/portfolio/perhe-2.jpg",
      "/portfolio/perhe-3.jpg",
      "/portfolio/perhe-4.jpg",
      "/portfolio/perhe-5.jpg",
      "/portfolio/perhe-6.jpg"
    ]
  },

  // ============================
  //  RIPPI- JA VALMISTUJAISET
  // ============================
  {
    slug: "rippi-ja-valmistujaiskuvaus",
    title: "Rippi- ja valmistujaiskuvaus",
    tagline: "Juhlapäivän muisto talteen tyylikkäillä potretteilla.",
    info: "Rippi- ja valmistujaiskuvauksessa yhdistetään juhlapäivän juhlavuus ja kuvattavan oma persoonallisuus. Kuvauksen voi tehdä juhlapaikalla, ulkona luonnossa tai jossain kuvattavalle tärkeässä miljöössä. Tavoitteena on tehdä kuvia, jotka tuntuvat ajattomilta vielä vuosien jälkeen.",
    pricingIntro:
      "Kuvauspaketit sisältävät yleensä tietyn kuvausajan ja valmiiden kuvien määrän. Lisäkuvista ja laajemmista paketeista voidaan sopia erikseen. Hinnastosta näet tyypillisimmät vaihtoehdot.",
    portfolioIntro:
      "Alla esimerkkejä rippi- ja valmistujaiskuvista – sekä perinteisempiä että rennompia potretteja.",
    heroImage: "/services/rippikuvaus-hero.jpg",
    heroImageAlt:
      "Valmistuva seisoo ulkona juhlapuvussa ja katsoo kameraan.",
    howItWorks: [
      {
        title: "1. Kuvauksen varaus",
        desc: "Sovitaan ajankohta ja paikka – ennen juhlaa, juhlapäivänä tai jälkikäteen. Voimme kuvata yksin tai yhdessä perheen kanssa."
      },
      {
        title: "2. Paikan valinta",
        desc: "Valitaan miljöö, joka sopii kuvattavan tyyliin – kaupunkiympäristö, luonto, juhlapaikka tai esimerkiksi koulu."
      },
      {
        title: "3. Kuvaus",
        desc: "Kuvaus on rauhallinen ja ohjattu. Vaihdamme tarvittaessa paikkaa ja asentoja, jotta saadaan sekä perinteisiä että rennompia kuvia."
      },
      {
        title: "4. Valinta & toimitus",
        desc: "Vedosgalleriasta valitaan suosikkikuvat, jotka viimeistellään huolellisesti. Valmiit kuvat sopivat sekä seinälle että kiitoskortteihin."
      }
    ],
    faq: [
      {
        q: "Voiko kavereiden kanssa ottaa yhteiskuvia?",
        a: "Kyllä, se on itse asiassa todella suosittua. Yhteiskuvat kavereiden kanssa ovat hauska muisto juhlapäivästä."
      },
      {
        q: "Onko asua / pukua hyvä vaihtaa?",
        a: "Mahdollista – esimerkiksi rippimekon tai juhlapuvun lisäksi voidaan ottaa muutama kuva rennommassa asussa."
      },
      {
        q: "Kuinka ajoissa kuvaus kannattaa varata?",
        a: "Sesonkiaikoina (kevään ja alkukesän juhlat) kuvausaikataulut täyttyvät nopeasti. Suosittelen varaamaan ajan useampi viikko etukäteen."
      }
    ],
    portfolioImages: [
      "/portfolio/rippi-1.jpg",
      "/portfolio/rippi-2.jpg",
      "/portfolio/rippi-3.jpg",
      "/portfolio/rippi-4.jpg",
      "/portfolio/rippi-5.jpg",
      "/portfolio/rippi-6.jpg"
    ]
  },

  // ============================
  //  ASUNTOKUVAUS
  // ============================
  {
    slug: "asuntokuvaus",
    title: "Asuntokuvaus",
    tagline: "Valoisat ja myyvät kuvat asunnon myyntiin tai vuokraukseen.",
    info: "Asuntokuvauksessa tuon esiin tilan parhaat puolet – valon, tilantunnun ja selkeyden. Hyvät kuvat erottavat kohteen muista ilmoituksista ja tekevät ensivaikutelmasta houkuttelevan. Kuvaus tehdään ripeästi, mutta huolellisesti, jotta asunnon esittelyt voivat alkaa ajallaan.",
    pricingIntro:
      "Asuntokuvauksessa hinta riippuu yleensä asunnon koosta, sijainnista ja mahdollisista lisäpalveluista (esim. pohjakuvat, ilmakuvat). Hinnastosta näet selkeät lähtöhinnat eri kokoisille kohteille.",
    portfolioIntro:
      "Alla esimerkkejä asuntokuvauksista – sekä pieniä että suurempia kohteita eri vuodenaikoina.",
    heroImage: "/services/asuntokuvaus-hero.jpg",
    heroImageAlt:
      "Valoisa olohuone, jossa suuri ikkuna ja selkeä sisustus.",
    howItWorks: [
      {
        title: "1. Tiedot kohteesta",
        desc: "Kerro asunnon sijainti, koko ja erityispiirteet. Voin antaa myös vinkkejä stailausta varten ennen kuvausta."
      },
      {
        title: "2. Kuvauspäivän sopiminen",
        desc: "Sovitaan ajankohta, jolloin asunnossa on mahdollisimman hyvä luonnonvalo. Usein päivä tai iltapäivä toimii parhaiten."
      },
      {
        title: "3. Kuvaus paikan päällä",
        desc: "Kuvaan tilat järjestelmällisesti: olohuone, keittiö, makuuhuoneet, märkätilat ja mahdolliset parvekkeet/terassit."
      },
      {
        title: "4. Valmiit kuvat ilmoitukseen",
        desc: "Valmiit, editoidut kuvat toimitetaan nopeasti ja optimoituna asunnon myynti- tai vuokrailmoitusta varten."
      }
    ],
    faq: [
      {
        q: "Pitääkö asunnon olla täysin siisti?",
        a: "Mitä selkeämpi ja siistimpi asunto on, sitä paremmin kuvat toimivat. Pienet arjen jäljet eivät haittaa, mutta suurempi tavaramäärä kannattaa siivota pois näkyvistä."
      },
      {
        q: "Tarvitaanko stailausta erikseen?",
        a: "Pienet muutokset, kuten tyynyjen, vilttien ja kasvien asettelu, riittävät usein hyvin. Tarvittaessa voimme sopia erillisestä stailauksesta."
      },
      {
        q: "Kuvaatko myös taloyhtiön yhteisiä tiloja?",
        a: "Kyllä, esimerkiksi piha, leikkialue, sauna- ja kerhotilat ovat usein tärkeitä myynnin kannalta."
      }
    ],
    portfolioImages: [
      "/portfolio/asunto-1.jpg",
      "/portfolio/asunto-2.jpg",
      "/portfolio/asunto-3.jpg",
      "/portfolio/asunto-4.jpg",
      "/portfolio/asunto-5.jpg",
      "/portfolio/asunto-6.jpg"
    ]
  },

  // ============================
  //  HAUTAJAISKUVAUS
  // ============================
  {
    slug: "hautajaiskuvaus",
    title: "Hautajaiskuvaus",
    tagline: "Hienovarainen dokumentointi arvokkaista hetkistä.",
    info: "Hautajaiskuvauksessa työskentelen rauhallisesti ja huomaamattomasti. Tavoitteena on tallentaa tilaisuuden tunnelma, läheisten läsnäolo ja pienet eleet kunnioittavalla tavalla. Kuvaus räätälöidään aina tilanteen ja omaisten toiveiden mukaan.",
    pricingIntro:
      "Hautajaiskuvauksen hinnoittelussa huomioidaan tilaisuuden kesto, paikat (esim. kirkko + muistotilaisuus) ja matkakulut. Hinnaston avulla saat yleiskuvan, mutta lopullinen hinta sovitaan aina rauhassa yhdessä.",
    portfolioIntro:
      "Alla muutamia esimerkkikuvia hautajaiskuvauksista – yksityiskohtia, tunnelmaa ja läheisten kohtaamisia.",
    heroImage: "/services/hautajaiskuvaus-hero.jpg",
    heroImageAlt:
      "Kukkaseppele ja kynttilä hautajaisissa, rauhallinen tunnelma.",
    howItWorks: [
      {
        title: "1. Yhteydenotto",
        desc: "Kerro lyhyesti tilaisuuden ajankohta, paikka ja toiveet. Vastaan mahdollisimman pian ja käymme asiat läpi herkkyydellä."
      },
      {
        title: "2. Suunnittelu",
        desc: "Sovimme, missä kohtaa tilaisuutta olen kuvaamassa, ketkä ovat tärkeimpiä henkilöitä, ja onko jotain, mitä erityisesti toivotaan kuvattavan tai jätettävän kuvaamatta."
      },
      {
        title: "3. Kuvaus",
        desc: "Työskentelen mahdollisimman huomaamattomasti ja kunnioittavasti. En häiritse tilaisuutta, vaan dokumentoin sen kulkua rauhallisesti."
      },
      {
        title: "4. Kuvien toimitus",
        desc: "Valmiit kuvat toimitetaan harkitusti editoituna ja rauhassa sovitussa aikataulussa. Toimitustavan voimme sopia erikseen (esim. yksityinen galleria)."
      }
    ],
    faq: [
      {
        q: "Onko hautajaiskuvaus yleistä?",
        a: "Kyllä, yhä useampi haluaa tallettaa tilaisuudesta muiston – erityisesti silloin, kun paikalle saapuu sukulaisia kauempaa tai eri sukupolvista."
      },
      {
        q: "Voimmeko päättää, mitä kuvia jaetaan laajemmin?",
        a: "Ehdottomasti. Voimme valita erikseen kuvat, joita jaetaan vain lähipiirin kesken ja kuvat, joita voi näyttää esimerkiksi muistotilaisuuden jälkeen muille."
      },
      {
        q: "Miten otat huomioon omaisten toiveet?",
        a: "Kysyn etukäteen mahdollisimman selkeästi, mitä toivotaan. Kuvaustilanteessa kunnioitan aina omaisten toiveita ja tilannetta – kameran kanssa voi myös poistua, jos jokin hetki halutaan pitää täysin yksityisenä."
      }
    ],
    portfolioImages: [
      "/portfolio/hautajaiset-1.jpg",
      "/portfolio/hautajaiset-2.jpg",
      "/portfolio/hautajaiset-3.jpg",
      "/portfolio/hautajaiset-4.jpg",
      "/portfolio/hautajaiset-5.jpg",
      "/portfolio/hautajaiset-6.jpg"
    ]
  },

  // ============================
  //  ELÄINKUVAUS
  // ============================
  {
    slug: "elainkuvaus",
    title: "Eläinkuvaus",
    tagline: "Lemmikkisi näköiset kuvat – rennosti ja leikillisesti.",
    info: "Eläinkuvauksessa annetaan aikaa tutustumiselle ja leikille, jotta eläin ehtii rentoutua. Kuvaan sekä muotokuvia että arkisia hetkiä, joissa lemmikin persoona tulee esiin. Kuvaus voidaan tehdä kotona, ulkona tai muussa eläimelle tutussa ympäristössä.",
    pricingIntro:
      "Eläinkuvauksissa on selkeä perushinta, johon sisältyy kuvausaika ja tietty määrä valmiita kuvia. Lisäkuvia ja pidempiä kuvauksia on mahdollista sopia erikseen. Hinnastosta näet peruspakettien hinnat.",
    portfolioIntro:
      "Alla esimerkkejä eläinkuvauksista – koiria, kissoja ja muita perheenjäseniä erilaisissa ympäristöissä.",
    heroImage: "/services/elainkuvaus-hero.jpg",
    heroImageAlt:
      "Koira juoksee kohti kameraa niityllä aurinkoisena päivänä.",
    howItWorks: [
      {
        title: "1. Tiedot lemmikistä",
        desc: "Kerro millainen eläin on kyseessä, millainen luonne sillä on ja onko jotain erityistä huomioitavaa (ikä, terveys, arkuus)."
      },
      {
        title: "2. Kuvauspaikan valinta",
        desc: "Valitaan paikka, jossa eläin tuntee olonsa turvalliseksi – esimerkiksi koti, lähimetsä, koirapuisto tai muu tuttu ympäristö."
      },
      {
        title: "3. Kuvaushetki",
        desc: "Annetaan eläimen tutustua kameraan ja ympäristöön rauhassa. Kuvaus etenee eläimen ehdoilla – välillä leikitään, välillä istutaan, välillä juostaan."
      },
      {
        title: "4. Kuvien valinta",
        desc: "Saat vedosgallerian, josta valitset suosikkikuvasi. Valitut kuvat viimeistellään huolellisesti ennen toimitusta."
      }
    ],
    faq: [
      {
        q: "Mitä jos lemmikki ei pysy paikallaan?",
        a: "Se on täysin ok – moni lemmikki on energinen tai jännittynyt aluksi. Kuvia ei oteta vain paikallaan seisovasta eläimestä, vaan myös liikkeestä ja leikistä."
      },
      {
        q: "Voimmeko olla mukana kuvissa lemmikin kanssa?",
        a: "Ehdottomasti. Yhteiskuvat lemmikin kanssa ovat usein koko setin tärkeimpiä ja koskettavimpia kuvia."
      },
      {
        q: "Voiko vanhaa tai sairaan lemmikin kuvata?",
        a: "Kyllä, ja se on monelle erittäin tärkeä muisto. Kuvaus tehdään tällöin mahdollisimman rauhallisesti ja eläimen vointi huomioiden."
      }
    ],
    portfolioImages: [
      "/portfolio/elain-1.jpg",
      "/portfolio/elain-2.jpg",
      "/portfolio/elain-3.jpg",
      "/portfolio/elain-4.jpg",
      "/portfolio/elain-5.jpg",
      "/portfolio/elain-6.jpg"
    ]
  }
];

export function getServicePage(slug: string): ServicePageConfig | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
