export interface Fronter {
  name: string;
  pronouns: string;
}

export interface Fronters {
  members: Fronter[];
}

export async function getFronter() {
  const frontersRequest = await fetch(
    'https://api.pluralkit.me/v2/systems/wzylv/fronters',
    { next: { revalidate: 3600 } },
  );
  const frontersResponse: Fronters = await frontersRequest.json();
  const fronter = frontersResponse.members.reduceRight(
    (acc: string, val) => `${val.name} (${val.pronouns}), ${acc}`,
    '',
  );
  return fronter;
}
