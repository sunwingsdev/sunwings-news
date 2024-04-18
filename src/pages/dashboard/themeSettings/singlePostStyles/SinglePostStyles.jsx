import { Helmet } from "react-helmet-async";
import BodyBackground from "../../../../components/dashboard/themeSettings/bodyStyles/BodyBackground";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetBodyThemeQuery,
  useUpdateSinglePostAuthorMutation,
  useUpdateSinglePostBgMutation,
  useUpdateSinglePostLatestNewsCardMutation,
  useUpdateSinglePostPopularNewsCardMutation,
  useUpdateSinglePostPublishDateMutation,
  useUpdateSinglePostQilllMutation,
  useUpdateSinglePostTitleMutation,
} from "../../../../redux/features/allApis/bodyThemeApi/bodyThemeApi";
import Swal from "sweetalert2";

const SinglePostStyles = () => {
  const [bgLoading, setBgLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState(false);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [loadingPublishDate, setLoadingPublishDate] = useState(false);
  const [loadingQuill, setLoadingQuill] = useState(false);
  const [loadingLatestNewsCard, setLoadingLatestNewsCard] = useState(false);
  const [loadingPopularNewsCard, setLoadingPopularNewsCard] = useState(false);
  const { reset } = useForm();
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const [updateSinglePostBg] = useUpdateSinglePostBgMutation();
  const [updateSinglePostTitle] = useUpdateSinglePostTitleMutation();
  const [updateSinglePostAuthor] = useUpdateSinglePostAuthorMutation();
  const [updatePublishDate] = useUpdateSinglePostPublishDateMutation();
  const [updateSinglePostQuill] = useUpdateSinglePostQilllMutation();
  const [updateSinglePostLatestNewsCard] =
    useUpdateSinglePostLatestNewsCardMutation();
  const [updateSinglePostPopularNewsCard] =
    useUpdateSinglePostPopularNewsCardMutation();
  const id = bodyThemes?.[0]._id;
  const singleTheme = bodyThemes?.[0];

  const handleSinglePostBgSubmit = async (data) => {
    delete data.sampleColor;

    try {
      setBgLoading(true);

      const result = await updateSinglePostBg({
        id: id,
        bodyBg: singleTheme.bodyBg,
        newscardTitleFontSize: singleTheme?.newscardTitleFontSize,
        newscardTitleFontColor: singleTheme?.newscardTitleFontColor,
        marqueBg: singleTheme?.marqueBg,
        marqueTitleFontColor: singleTheme?.marqueTitleFontColor,
        marqueTitleFontSize: singleTheme?.marqueTitleFontSize,
        menuBg: singleTheme?.menuBg,
        menuTitleFontColor: singleTheme?.menuTitleFontColor,
        menuTitleFontSize: singleTheme?.menuTitleFontSize,
        moreNewsTitleFontColor: singleTheme?.moreNewsTitleFontColor,
        moreNewsTitleFontSize: singleTheme?.moreNewsTitleFontSize,
        singlePostBg: data.singlePostBg,
        singlePostTitleFontColor: singleTheme?.singlePostTitleFontColor,
        singlePostTitleFontSize: singleTheme?.singlePostTitleFontSize,
        singlePostAuthorFontColor: singleTheme?.singlePostAuthorFontColor,
        singlePostAuthorFontSize: singleTheme?.singlePostAuthorFontSize,
        singlePostAuthorImageSize: singleTheme?.singlePostAuthorImageSize,
        singlePostPublishDateFontColor:
          singleTheme?.singlePostPublishDateFontColor,
        singlePostPublishDateFontSize:
          singleTheme?.singlePostPublishDateFontSize,
        singlePostQuillFontColor: singleTheme?.singlePostQuillFontColor,
        singlePostQuillFontSize: singleTheme?.singlePostQuillFontSize,
        latestNewsCardBg: singleTheme?.latestNewsCardBg,
        latestNewsCardFontColor: singleTheme?.latestNewsCardFontColor,
        latestNewsCardFontSize: singleTheme?.latestNewsCardFontSize,
        popularNewsCardBg: singleTheme?.popularNewsCardBg,
        popularNewsCardFontColor: singleTheme?.popularNewsCardFontColor,
        popularNewsCardFontSize: singleTheme?.popularNewsCardFontSize,
      });
      if (result.data.modifiedCount > 0) {
        setBgLoading(false);
        reset();
        Swal.fire({
          title: "Single Post Background Color Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setBgLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Single Post Background Color: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleSinglePostTitleSubmit = async (data) => {
    delete data.sampleColor;
    delete data.takenTextColor;
    try {
      setTitleLoading(true);

      const result = await updateSinglePostTitle({
        id: id,
        bodyBg: singleTheme.bodyBg,
        newscardTitleFontSize: singleTheme?.newscardTitleFontSize,
        newscardTitleFontColor: singleTheme?.newscardTitleFontColor,
        marqueBg: singleTheme?.marqueBg,
        marqueTitleFontColor: singleTheme?.marqueTitleFontColor,
        marqueTitleFontSize: singleTheme?.marqueTitleFontSize,
        menuBg: singleTheme?.menuBg,
        menuTitleFontColor: singleTheme?.menuTitleFontColor,
        menuTitleFontSize: singleTheme?.menuTitleFontSize,
        moreNewsTitleFontColor: singleTheme?.moreNewsTitleFontColor,
        moreNewsTitleFontSize: singleTheme?.moreNewsTitleFontSize,
        singlePostBg: singleTheme.singlePostBg,
        singlePostTitleFontColor: data?.singlePostTitleFontColor,
        singlePostTitleFontSize: data?.singlePostTitleFontSize,
        singlePostAuthorFontColor: singleTheme?.singlePostAuthorFontColor,
        singlePostAuthorFontSize: singleTheme?.singlePostAuthorFontSize,
        singlePostAuthorImageSize: singleTheme?.singlePostAuthorImageSize,
        singlePostPublishDateFontColor:
          singleTheme?.singlePostPublishDateFontColor,
        singlePostPublishDateFontSize:
          singleTheme?.singlePostPublishDateFontSize,
        singlePostQuillFontColor: singleTheme?.singlePostQuillFontColor,
        singlePostQuillFontSize: singleTheme?.singlePostQuillFontSize,
        latestNewsCardBg: singleTheme?.latestNewsCardBg,
        latestNewsCardFontColor: singleTheme?.latestNewsCardFontColor,
        latestNewsCardFontSize: singleTheme?.latestNewsCardFontSize,
        popularNewsCardBg: singleTheme?.popularNewsCardBg,
        popularNewsCardFontColor: singleTheme?.popularNewsCardFontColor,
        popularNewsCardFontSize: singleTheme?.popularNewsCardFontSize,
      });
      if (result.data.modifiedCount > 0) {
        setTitleLoading(false);
        reset();
        Swal.fire({
          title: "Single Post Title Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setTitleLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Single Post Title: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleAuthorSubmit = async (data) => {
    delete data.sampleColor;
    delete data.takenTextColor;
    try {
      setLoadingAuthor(true);

      const result = await updateSinglePostAuthor({
        id: id,
        bodyBg: singleTheme.bodyBg,
        newscardTitleFontSize: singleTheme?.newscardTitleFontSize,
        newscardTitleFontColor: singleTheme?.newscardTitleFontColor,
        marqueBg: singleTheme?.marqueBg,
        marqueTitleFontColor: singleTheme?.marqueTitleFontColor,
        marqueTitleFontSize: singleTheme?.marqueTitleFontSize,
        menuBg: singleTheme?.menuBg,
        menuTitleFontColor: singleTheme?.menuTitleFontColor,
        menuTitleFontSize: singleTheme?.menuTitleFontSize,
        moreNewsTitleFontColor: singleTheme?.moreNewsTitleFontColor,
        moreNewsTitleFontSize: singleTheme?.moreNewsTitleFontSize,
        singlePostBg: singleTheme.singlePostBg,
        singlePostTitleFontColor: singleTheme?.singlePostTitleFontColor,
        singlePostTitleFontSize: singleTheme?.singlePostTitleFontSize,
        singlePostAuthorFontColor: data?.singlePostAuthorFontColor,
        singlePostAuthorFontSize: data?.singlePostAuthorFontSize,
        singlePostAuthorImageSize: data?.singlePostAuthorImageSize,
        singlePostPublishDateFontColor:
          singleTheme?.singlePostPublishDateFontColor,
        singlePostPublishDateFontSize:
          singleTheme?.singlePostPublishDateFontSize,
        singlePostQuillFontColor: singleTheme?.singlePostQuillFontColor,
        singlePostQuillFontSize: singleTheme?.singlePostQuillFontSize,
        latestNewsCardBg: singleTheme?.latestNewsCardBg,
        latestNewsCardFontColor: singleTheme?.latestNewsCardFontColor,
        latestNewsCardFontSize: singleTheme?.latestNewsCardFontSize,
        popularNewsCardBg: singleTheme?.popularNewsCardBg,
        popularNewsCardFontColor: singleTheme?.popularNewsCardFontColor,
        popularNewsCardFontSize: singleTheme?.popularNewsCardFontSize,
      });
      if (result.data.modifiedCount > 0) {
        setLoadingAuthor(false);
        reset();
        Swal.fire({
          title: "Single Post Author Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoadingAuthor(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Single Post Author: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleSinglePostPublishDateSubmit = async (data) => {
    delete data.sampleColor;
    delete data.takenTextColor;
    try {
      setLoadingPublishDate(true);

      const result = await updatePublishDate({
        id: id,
        bodyBg: singleTheme.bodyBg,
        newscardTitleFontSize: singleTheme?.newscardTitleFontSize,
        newscardTitleFontColor: singleTheme?.newscardTitleFontColor,
        marqueBg: singleTheme?.marqueBg,
        marqueTitleFontColor: singleTheme?.marqueTitleFontColor,
        marqueTitleFontSize: singleTheme?.marqueTitleFontSize,
        menuBg: singleTheme?.menuBg,
        menuTitleFontColor: singleTheme?.menuTitleFontColor,
        menuTitleFontSize: singleTheme?.menuTitleFontSize,
        moreNewsTitleFontColor: singleTheme?.moreNewsTitleFontColor,
        moreNewsTitleFontSize: singleTheme?.moreNewsTitleFontSize,
        singlePostBg: singleTheme.singlePostBg,
        singlePostTitleFontColor: singleTheme?.singlePostTitleFontColor,
        singlePostTitleFontSize: singleTheme?.singlePostTitleFontSize,
        singlePostAuthorFontColor: singleTheme?.singlePostAuthorFontColor,
        singlePostAuthorFontSize: singleTheme?.singlePostAuthorFontSize,
        singlePostAuthorImageSize: singleTheme?.singlePostAuthorImageSize,
        singlePostPublishDateFontColor: data?.singlePostPublishDateFontColor,
        singlePostPublishDateFontSize: data?.singlePostPublishDateFontSize,
        singlePostQuillFontColor: singleTheme?.singlePostQuillFontColor,
        singlePostQuillFontSize: singleTheme?.singlePostQuillFontSize,
        latestNewsCardBg: singleTheme?.latestNewsCardBg,
        latestNewsCardFontColor: singleTheme?.latestNewsCardFontColor,
        latestNewsCardFontSize: singleTheme?.latestNewsCardFontSize,
        popularNewsCardBg: singleTheme?.popularNewsCardBg,
        popularNewsCardFontColor: singleTheme?.popularNewsCardFontColor,
        popularNewsCardFontSize: singleTheme?.popularNewsCardFontSize,
      });
      if (result.data.modifiedCount > 0) {
        setLoadingPublishDate(false);
        reset();
        Swal.fire({
          title: "Publish Date Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoadingPublishDate(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Publish Date content: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleSinglePostQuillSubmit = async (data) => {
    delete data.sampleColor;
    delete data.takenTextColor;
    try {
      setLoadingQuill(true);

      const result = await updateSinglePostQuill({
        id: id,
        bodyBg: singleTheme.bodyBg,
        newscardTitleFontSize: singleTheme?.newscardTitleFontSize,
        newscardTitleFontColor: singleTheme?.newscardTitleFontColor,
        marqueBg: singleTheme?.marqueBg,
        marqueTitleFontColor: singleTheme?.marqueTitleFontColor,
        marqueTitleFontSize: singleTheme?.marqueTitleFontSize,
        menuBg: singleTheme?.menuBg,
        menuTitleFontColor: singleTheme?.menuTitleFontColor,
        menuTitleFontSize: singleTheme?.menuTitleFontSize,
        moreNewsTitleFontColor: singleTheme?.moreNewsTitleFontColor,
        moreNewsTitleFontSize: singleTheme?.moreNewsTitleFontSize,
        singlePostBg: singleTheme.singlePostBg,
        singlePostTitleFontColor: singleTheme?.singlePostTitleFontColor,
        singlePostTitleFontSize: singleTheme?.singlePostTitleFontSize,
        singlePostAuthorFontColor: singleTheme?.singlePostAuthorFontColor,
        singlePostAuthorFontSize: singleTheme?.singlePostAuthorFontSize,
        singlePostAuthorImageSize: singleTheme?.singlePostAuthorImageSize,
        singlePostPublishDateFontColor:
          singleTheme?.singlePostPublishDateFontColor,
        singlePostPublishDateFontSize:
          singleTheme?.singlePostPublishDateFontSize,
        singlePostQuillFontColor: data?.singlePostQuillFontColor,
        singlePostQuillFontSize: data?.singlePostQuillFontSize,
        latestNewsCardBg: singleTheme?.latestNewsCardBg,
        latestNewsCardFontColor: singleTheme?.latestNewsCardFontColor,
        latestNewsCardFontSize: singleTheme?.latestNewsCardFontSize,
        popularNewsCardBg: singleTheme?.popularNewsCardBg,
        popularNewsCardFontColor: singleTheme?.popularNewsCardFontColor,
        popularNewsCardFontSize: singleTheme?.popularNewsCardFontSize,
      });
      if (result.data.modifiedCount > 0) {
        setLoadingQuill(false);
        reset();
        Swal.fire({
          title: "Quill Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoadingQuill(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Quill: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleSinglePostLatestNewsCardSubmit = async (data) => {
    delete data.sampleColor;
    delete data.takenTextColor;
    try {
      setLoadingLatestNewsCard(true);

      const result = await updateSinglePostLatestNewsCard({
        id: id,
        bodyBg: singleTheme.bodyBg,
        newscardTitleFontSize: singleTheme?.newscardTitleFontSize,
        newscardTitleFontColor: singleTheme?.newscardTitleFontColor,
        marqueBg: singleTheme?.marqueBg,
        marqueTitleFontColor: singleTheme?.marqueTitleFontColor,
        marqueTitleFontSize: singleTheme?.marqueTitleFontSize,
        menuBg: singleTheme?.menuBg,
        menuTitleFontColor: singleTheme?.menuTitleFontColor,
        menuTitleFontSize: singleTheme?.menuTitleFontSize,
        moreNewsTitleFontColor: singleTheme?.moreNewsTitleFontColor,
        moreNewsTitleFontSize: singleTheme?.moreNewsTitleFontSize,
        singlePostBg: singleTheme.singlePostBg,
        singlePostTitleFontColor: singleTheme?.singlePostTitleFontColor,
        singlePostTitleFontSize: singleTheme?.singlePostTitleFontSize,
        singlePostAuthorFontColor: singleTheme?.singlePostAuthorFontColor,
        singlePostAuthorFontSize: singleTheme?.singlePostAuthorFontSize,
        singlePostAuthorImageSize: singleTheme?.singlePostAuthorImageSize,
        singlePostPublishDateFontColor:
          singleTheme?.singlePostPublishDateFontColor,
        singlePostPublishDateFontSize:
          singleTheme?.singlePostPublishDateFontSize,
        singlePostQuillFontColor: singleTheme?.singlePostQuillFontColor,
        singlePostQuillFontSize: singleTheme?.singlePostQuillFontSize,
        latestNewsCardBg: data?.latestNewsCardBg,
        latestNewsCardFontColor: data?.latestNewsCardFontColor,
        latestNewsCardFontSize: data?.latestNewsCardFontSize,
        popularNewsCardBg: singleTheme?.popularNewsCardBg,
        popularNewsCardFontColor: singleTheme?.popularNewsCardFontColor,
        popularNewsCardFontSize: singleTheme?.popularNewsCardFontSize,
      });
      if (result.data.modifiedCount > 0) {
        setLoadingLatestNewsCard(false);
        reset();
        Swal.fire({
          title: "Latest News Card Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoadingLatestNewsCard(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Latest News Card: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleSinglePostPopularNewsCardSubmit = async (data) => {
    delete data.sampleColor;
    delete data.takenTextColor;
    try {
      setLoadingPopularNewsCard(true);

      const result = await updateSinglePostPopularNewsCard({
        id: id,
        bodyBg: singleTheme.bodyBg,
        newscardTitleFontSize: singleTheme?.newscardTitleFontSize,
        newscardTitleFontColor: singleTheme?.newscardTitleFontColor,
        marqueBg: singleTheme?.marqueBg,
        marqueTitleFontColor: singleTheme?.marqueTitleFontColor,
        marqueTitleFontSize: singleTheme?.marqueTitleFontSize,
        menuBg: singleTheme?.menuBg,
        menuTitleFontColor: singleTheme?.menuTitleFontColor,
        menuTitleFontSize: singleTheme?.menuTitleFontSize,
        moreNewsTitleFontColor: singleTheme?.moreNewsTitleFontColor,
        moreNewsTitleFontSize: singleTheme?.moreNewsTitleFontSize,
        singlePostBg: singleTheme.singlePostBg,
        singlePostTitleFontColor: singleTheme?.singlePostTitleFontColor,
        singlePostTitleFontSize: singleTheme?.singlePostTitleFontSize,
        singlePostAuthorFontColor: singleTheme?.singlePostAuthorFontColor,
        singlePostAuthorFontSize: singleTheme?.singlePostAuthorFontSize,
        singlePostAuthorImageSize: singleTheme?.singlePostAuthorImageSize,
        singlePostPublishDateFontColor:
          singleTheme?.singlePostPublishDateFontColor,
        singlePostPublishDateFontSize:
          singleTheme?.singlePostPublishDateFontSize,
        singlePostQuillFontColor: singleTheme?.singlePostQuillFontColor,
        singlePostQuillFontSize: singleTheme?.singlePostQuillFontSize,
        latestNewsCardBg: singleTheme?.latestNewsCardBg,
        latestNewsCardFontColor: singleTheme?.latestNewsCardFontColor,
        latestNewsCardFontSize: singleTheme?.latestNewsCardFontSize,
        popularNewsCardBg: data?.popularNewsCardBg,
        popularNewsCardFontColor: data?.popularNewsCardFontColor,
        popularNewsCardFontSize: data?.popularNewsCardFontSize,
      });
      if (result.data.modifiedCount > 0) {
        setLoadingPopularNewsCard(false);
        reset();
        Swal.fire({
          title: "Popular News Card Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoadingPopularNewsCard(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Popular News Card: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Sunwings | Single Post Styles</title>
      </Helmet>
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-black text-2xl">Single Post Styles</h1>
        <div className="flex flex-col gap-8 w-full">
          <BodyBackground
            onSubmit={handleSinglePostBgSubmit}
            labelH1="Page Background"
            BgColor="singlePostBg"
            Bglabel="BgColor"
            subLabel="Pick a Background Color for the Single Post."
            loading={bgLoading}
          />
          <BodyBackground
            onSubmit={handleSinglePostTitleSubmit}
            labelH1="News Title"
            subLabel="Please Set Font Size & Pick a Color for News Title."
            TextFontColor="singlePostTitleFontColor"
            TextFontColorLabel="Font Color"
            TextFontSize="singlePostTitleFontSize"
            TextFontSizeLabel="Font Size"
            loading={titleLoading}
          />
          <BodyBackground
            onSubmit={handleAuthorSubmit}
            labelH1="Author"
            subLabel="Please Set Image Size, Font Size & Pick a Color for Author."
            TextFontColor="singlePostAuthorFontColor"
            TextFontColorLabel="Font Color"
            TextFontSize="singlePostAuthorFontSize"
            TextFontSizeLabel="Font Size"
            ImageSize="singlePostAuthorImageSize"
            ImageSizeLabel="Image Size"
            loading={loadingAuthor}
          />
          <BodyBackground
            onSubmit={handleSinglePostPublishDateSubmit}
            labelH1="Publish Date"
            subLabel="Please Set Font Size & Pick a Color for Publish Date."
            TextFontColor="singlePostPublishDateFontColor"
            TextFontColorLabel="Font Color"
            TextFontSize="singlePostPublishDateFontSize"
            TextFontSizeLabel="Font Size"
            loading={loadingPublishDate}
          />
          <BodyBackground
            onSubmit={handleSinglePostQuillSubmit}
            labelH1="News Details / Quill"
            subLabel="Please Set Font Size & Pick a Color for News Details."
            TextFontColor="singlePostQuillFontColor"
            TextFontColorLabel="Font Color"
            TextFontSize="singlePostQuillFontSize"
            TextFontSizeLabel="Font Size"
            loading={loadingQuill}
          />
          <BodyBackground
            onSubmit={handleSinglePostLatestNewsCardSubmit}
            labelH1="Latest News Card"
            subLabel="Please Set Font Size & Pick a Color for Latest News Card."
            BgColor="latestNewsCardBg"
            Bglabel="Bg Color"
            TextFontColor="latestNewsCardFontColor"
            TextFontColorLabel="Font Color"
            TextFontSize="latestNewsCardFontSize"
            TextFontSizeLabel="Font Size"
            loading={loadingLatestNewsCard}
          />
          <BodyBackground
            onSubmit={handleSinglePostPopularNewsCardSubmit}
            labelH1="Popular News Card"
            subLabel="Please Set Font Size & Pick a Color for Popular News Card."
            BgColor="popularNewsCardBg"
            Bglabel="Bg Color"
            TextFontColor="popularNewsCardFontColor"
            TextFontColorLabel="Font Color"
            TextFontSize="popularNewsCardFontSize"
            TextFontSizeLabel="Font Size"
            loading={loadingPopularNewsCard}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePostStyles;
