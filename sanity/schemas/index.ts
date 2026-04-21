/**
 * Sanity schema registry.
 * Spec: PLAN.md §4.1.
 */
import { siteSettings } from "./siteSettings";
import { navigation } from "./navigation";
import { page } from "./page";
import { partner } from "./partner";
import { service } from "./service";
import { servicePackage } from "./servicePackage";
import { article } from "./article";
import { articleCategory } from "./articleCategory";
import { newsItem } from "./newsItem";
import { musing } from "./musing";
import { proofPoint } from "./proofPoint";
import { faq } from "./faq";
import { legalPage } from "./legalPage";
import { redirect } from "./redirect";

import { seo } from "./objects/seo";
import { cta } from "./objects/cta";
import { heroBlock } from "./objects/heroBlock";
import { navItem } from "./objects/navItem";
import { navGroup } from "./objects/navGroup";
import { portfolioItem } from "./objects/portfolioItem";
import { serviceSection } from "./objects/serviceSection";

import { portableText } from "./blocks/portableText";
import { pullQuote } from "./blocks/pullQuote";
import { dropCapPara } from "./blocks/dropCapPara";
import { photoEssay } from "./blocks/photoEssay";
import { marginNote } from "./blocks/marginNote";
import { inlineProduct } from "./blocks/inlineProduct";
import { inlineCollection } from "./blocks/inlineCollection";

export const schemaTypes = [
  siteSettings,
  navigation,
  page,
  partner,
  service,
  servicePackage,
  article,
  articleCategory,
  newsItem,
  musing,
  proofPoint,
  faq,
  legalPage,
  redirect,
  seo,
  cta,
  heroBlock,
  navItem,
  navGroup,
  portfolioItem,
  serviceSection,
  portableText,
  pullQuote,
  dropCapPara,
  photoEssay,
  marginNote,
  inlineProduct,
  inlineCollection,
];
