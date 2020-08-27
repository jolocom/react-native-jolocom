Pod::Spec.new do |s|
  s.name         = "RNJolocom"
  s.version      = "1.0.0"
  s.summary      = "RNJolocom"
  s.description  = <<-DESC
                  RNJolocom
                   DESC
  s.homepage     = "https://github.com/jolocom/react-native-jolocom"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "dev@jolocom.io" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/jolocom/react-native-jolocom.git", :tag => "master" }
  s.source_files  = "RNJolocom/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "JolocomCore"
end
