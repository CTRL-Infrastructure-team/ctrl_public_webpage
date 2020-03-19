import axios from "axios";

export default function({ app }) {
  return (app.$axios.asyncGet = async ref => {
    let res;
    res = process.server
      ? await app.$axios.$get(ref)
      : axios.get(ref).then(res => res.data);

    return res;
  });
}
