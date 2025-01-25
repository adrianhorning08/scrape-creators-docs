import React, { useState, useEffect } from 'react';
import { getLanguageExamples } from '../constants/codeExamples'; 
import { Check, Copy, Expand, Search, Sparkles } from 'lucide-react';
import Modal from './Modal';
import { formatJson } from '../utils/jsonFormatter';
import LLMPromptGenerator from './LLMPromptGenerator';

export default function CodeBlock({ code, language = 'JavaScript', endpoint, formState, inModal }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language === 'JavaScript' ? 'cURL' : language);
  const [selectedStatus, setSelectedStatus] = useState('200');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const searchInputRef = React.useRef(null);
  const codeRef = React.useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const languageExamples = getLanguageExamples(endpoint, formState, inModal);
  const displayCode = languageExamples[selectedLanguage] || code;
  const [customResponse, setCustomResponse] = useState(null);
  
  // Get the response content based on the selected status code
  const getResponseContent = () => {
    if (code) return code;
    if (!endpoint?.sampleResponse) return statusCodes[selectedStatus].content;
    
    switch (selectedStatus) {
      case '200':
        return formatJson(endpoint.sampleResponse);
      case '400':
        return formatJson({
          message: "Invalid request parameters"
        });
      case '500':
        return formatJson({
          message: "Internal server error"
        });
      default:
        return statusCodes[selectedStatus].content;
    }
  };
  
  const highlightMatches = (content, query) => {
    if (!query.trim()) return content;
    
    // Split content into tokens while preserving HTML tags
    const tokens = content.split(/(<[^>]+>)/);
    
    return tokens.map((token, i) => {
      // If token is an HTML tag, return it unchanged
      if (token.startsWith('<')) return token;
      
      // For text content, highlight matches while preserving case
      return token.replace(
        new RegExp(escapeRegExp(query), 'gi'),
        match => `<mark class="bg-yellow-400/50 text-white">${match}</mark>`
      );
    }).join('');
  };

  const isResponseExample = language === '200' || language === '400';
  
  const handleCopy = async () => {
    let textToCopy;
    if (isResponseExample) {
      // For response examples, copy the raw JSON
      const responseData = endpoint?.sampleResponse || statusCodes[selectedStatus].content;
      textToCopy = JSON.stringify(responseData, null, 2);
    } else {
      // For code examples, strip HTML tags
      textToCopy = displayCode.replace(/<[^>]+>/g, '');
    }
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const content = isResponseExample ? getResponseContent() : displayCode;
    const text = content.replace(/<[^>]+>/g, '');
    const regex = new RegExp(escapeRegExp(query), 'gi');
    const matches = Array.from(text.matchAll(regex), match => ({
      index: match.index,
      text: match[0]
    }));
    setSearchResults(matches);
    setCurrentMatchIndex(0);
    
    // Auto-scroll to first match after a short delay to allow for DOM update
    if (matches.length > 0) {
      setTimeout(() => {
        const marks = codeRef.current?.getElementsByTagName('mark');
        if (marks?.[0]) {
          marks[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const navigateMatches = (direction) => {
    const newIndex = direction === 'next'
      ? (currentMatchIndex + 1) % searchResults.length
      : (currentMatchIndex - 1 + searchResults.length) % searchResults.length;
    
    setCurrentMatchIndex(newIndex);
    
    const marks = codeRef.current?.getElementsByTagName('mark');
    if (marks?.[newIndex]) {
      marks[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  const statusCodes = {
    '200': {
      code: '200',
      color: 'text-[#2AB673]',
      content: formatJson({
        user: {
          id: "6659752019493208069",
          shortId: "",
          uniqueId: "stoolpresidente",
          nickname: "Dave Portnoy",
          avatarLarger: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7310178711609032710~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=15998&refresh_token=7cf59772528fdede8ae2ca283b10c73c&x-expires=1737910800&x-signature=rzbwsx1qg5Y6QpkDot%2BvsttsVJQ%3D&shp=a5d48078&shcp=81f88b70",
          avatarMedium: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7310178711609032710~c5_720x720.jpeg?lk3s=a5d48078&nonce=90349&refresh_token=6f7bb6230d53dd65419bae48b3552456&x-expires=1737910800&x-signature=WPFwwF36AsQM4A5t8xJjMprWhZg%3D&shp=a5d48078&shcp=81f88b70",
          avatarThumb: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7310178711609032710~c5_100x100.jpeg?lk3s=a5d48078&nonce=7248&refresh_token=b453a6aa44d9ea28a263c860e9755fd4&x-expires=1737910800&x-signature=eSEvLbtEAlwMAs43WEGBuY5P28k%3D&shp=a5d48078&shcp=81f88b70",
          signature: "El Presidente/Barstool Sports Founder.",
          createTime: 1550594547,
          verified: true,
          secUid: "MS4wLjABAAAAINC_ElRR-l1RCcnEjOZhNO-9wOzAMf-YHXqRY8vvG9bEhMRa6iu23TaE3JPZYXBD",
          ftc: false,
          relation: 0,
          openFavorite: false,
          bioLink: {
            link: "https://www.barstoolsports.com/bios/Surviving-Barstool",
            risk: 0
          },
          commentSetting: 0,
          commerceUserInfo: {
            commerceUser: false
          },
          duetSetting: 0,
          stitchSetting: 0,
          privateAccount: false,
          secret: false,
          isADVirtual: false,
          roomId: "",
          uniqueIdModifyTime: 0,
          ttSeller: false,
          region: "US",
          downloadSetting: 0,
          profileTab: {
            showMusicTab: false,
            showQuestionTab: false,
            showPlayListTab: true
          },
          followingVisibility: 1,
          recommendReason: "",
          nowInvitationCardUrl: "",
          nickNameModifyTime: 0,
          isEmbedBanned: false,
          canExpPlaylist: true,
          profileEmbedPermission: 1,
          language: "en",
          eventList: [],
          suggestAccountBind: false,
          isOrganization: 0
        },
        stats: {
          followerCount: 4100000,
          followingCount: 74,
          heart: 190300000,
          heartCount: 190300000,
          videoCount: 2016,
          diggCount: 0,
          friendCount: 52
        },
        itemList: []
      })
    },
    '400': {
      code: '400',
      color: 'text-[#F59E0B]',
      content: formatJson({
        message: "<string>"
      })
    },
    '500': {
      code: '500',
      color: 'text-[#EF4444]',
      content: formatJson({
        message: "<string>"
      })
    }
  };
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'f' && isFullscreen) {
        e.preventDefault();
        setIsSearchOpen(true);
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFullscreen]);
  
  return (
    <>
      <div className="flex flex-col not-prose relative overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800/50 bg-[#0F1117] dark:bg-codeblock text-gray-50 codeblock-dark">
        <div className="relative border-b border-gray-900/80 bg-[#0F1117] dark:bg-codeblock">
        <div className="text-xs leading-6 rounded-t-xl flex overflow-x-auto overflow-y-hidden mr-12 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25" role="tablist" aria-orientation="horizontal">
          {isResponseExample ? (
            Object.values(statusCodes).map((status) => (
              <button
                key={status.code}
                onClick={() => setSelectedStatus(status.code)}
                className={`group flex items-center relative px-2 pt-2.5 pb-2 outline-none whitespace-nowrap font-medium ${
                  selectedStatus === status.code ? status.color : 'text-gray-400'
                }`}
                role="tab"
                aria-selected={selectedStatus === status.code}
                tabIndex={selectedStatus === status.code ? 0 : -1}
              >
                <div className={`px-2 rounded-lg z-10 group-hover:bg-gray-700/60`}>
                  {status.code}
                </div>
                {selectedStatus === status.code && (
                  <div className={`absolute inset-0 border-b pointer-events-none ${status.color}`}></div>
                )}
              </button>
            ))
          ) : (
            Object.keys(languageExamples).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`group flex items-center relative px-2 pt-2.5 pb-2 outline-none whitespace-nowrap font-medium ${
                  selectedLanguage === lang ? 'text-primary-light' : 'text-gray-400'
                }`}
                role="tab"
                aria-selected={selectedLanguage === lang}
                tabIndex={selectedLanguage === lang ? 0 : -1}
              >
                <div className={`px-2 rounded-lg z-10 group-hover:bg-gray-700/60 group-hover:text-primary-light`}>
                  {lang}
                </div>
                {selectedLanguage === lang && (
                  <div className="absolute inset-0 border-b pointer-events-none border-primary dark:border-primary-light"></div>
                )}
              </button>
            ))
          )}
        </div>
        <div className="flex h-full absolute top-0 right-0 rounded-tr z-10 items-center gap-2 pr-4">
          <div className="flex items-center justify-center h-[42px]">
            <div className="group z-10 relative">
              <button 
                type="button"
                className="h-7 w-7 flex items-center justify-center rounded-md backdrop-blur" 
                data-testid="copy-code-button" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCopy();
                }}
                aria-label="Copy the contents from the code block"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                )}
              </button>
              <div className="absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-white rounded-lg px-1.5 py-0.5 text-xs bg-primary-dark">
                {copied ? 'Copied!' : 'Copy'}
              </div>
            </div>
          </div>
          {!isResponseExample && endpoint && (
            <div className="flex items-center justify-center h-[42px]">
              <LLMPromptGenerator endpoint={endpoint} selectedLanguage={selectedLanguage} />
            </div>
          )}
          {isResponseExample && <div className="flex items-center justify-center h-[42px]">
            <div className="group z-10 relative">
              <button
                className="h-7 w-7 flex items-center justify-center rounded-md backdrop-blur"
                onClick={toggleFullscreen}
                aria-label="Toggle fullscreen"
              >
                <Expand className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
              </button>
            </div>
          </div>}
        </div>
      </div>
      <div 
        className={`p-5 min-w-full overflow-x-auto w-full scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25 text-xs leading-[1.35rem] ${isResponseExample ? 'h-[300px]' : 'h-[180px]'}`} 
        style={{fontVariantLigatures: "none"}}
      >
        <div className="relative">
          <pre>
            <code
              dangerouslySetInnerHTML={{
                __html: isResponseExample
                  ? searchQuery
                    ? getResponseContent().replace(
                        new RegExp(searchQuery, 'gi'),
                        match => `<mark class="bg-yellow-400/50 text-white">${match}</mark>`
                      )
                    : getResponseContent()
                  : searchQuery
                    ? displayCode.replace(
                        new RegExp(searchQuery, 'gi'),
                        match => `<mark class="bg-yellow-400/50 text-white">${match}</mark>`
                      )
                    : displayCode
              }}
            />
          </pre>
        </div>
      </div>
      </div>
      <Modal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
        <div className="h-full flex flex-col">
          <div className="flex-none p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {isResponseExample ? (
                  <div className="flex space-x-2">
                    {Object.values(statusCodes).map((status) => (
                      <button
                        key={status.code}
                        onClick={() => setSelectedStatus(status.code)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          selectedStatus === status.code
                            ? `${status.color} bg-gray-800`
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        {status.code}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    {Object.keys(languageExamples).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          selectedLanguage === lang
                            ? 'text-primary-light bg-gray-800'
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-64 pl-9 pr-4 py-1.5 bg-gray-800 rounded-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-light"
                  />
                  {searchQuery && (
                    <span className="ml-2 text-xs text-gray-400 flex items-center">
                      {searchResults.length > 0 ? (
                        <>
                          <span className="mr-2">
                            {currentMatchIndex + 1} of {searchResults.length}
                          </span>
                          <button
                            onClick={() => navigateMatches('prev')}
                            className="p-1 hover:bg-gray-700 rounded mr-1"
                            disabled={searchResults.length <= 1}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => navigateMatches('next')}
                            className="p-1 hover:bg-gray-700 rounded"
                            disabled={searchResults.length <= 1}
                          >
                            ↓
                          </button>
                        </>
                      ) : (
                        'No matches'
                      )}
                    </span>
                  )}
                </div>
                <button 
                  className="p-1.5 text-gray-400 hover:text-gray-300 rounded-md hover:bg-gray-800"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <pre className="h-full text-gray-50" ref={codeRef}>
              <code
                dangerouslySetInnerHTML={{
                  __html: isResponseExample
                    ? searchQuery
                      ? highlightMatches(getResponseContent(), searchQuery)
                      : getResponseContent()
                    : searchQuery
                      ? highlightMatches(displayCode, searchQuery)
                      : displayCode
                }}
              />
            </pre>
          </div>
        </div>
      </Modal>
    </>
  );
}